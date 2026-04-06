import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

// Simple in-memory rate limiter (per IP, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Tracks emails that have successfully submitted the form (allows download)
const downloadTokens = new Map<string, number>();
const DOWNLOAD_TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getAuthClient() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY;

    if (!email || !key) {
        throw new Error('Missing Google service account configuration');
    }

    return new google.auth.JWT({
        email,
        key: key.replace(/\\n/g, '\n'),
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.readonly',
        ],
    });
}

// POST: Save lead to Google Sheets, issue download token
export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { fullName, email, propertyName, location, consent } = body;

        if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
            return NextResponse.json(
                { error: 'Full name is required (2-100 characters).' },
                { status: 400 }
            );
        }

        if (!email || typeof email !== 'string' || email.length > 254 || !validateEmail(email)) {
            return NextResponse.json(
                { error: 'A valid email address is required.' },
                { status: 400 }
            );
        }

        if (propertyName && (typeof propertyName !== 'string' || propertyName.length > 200)) {
            return NextResponse.json(
                { error: 'Property name must be under 200 characters.' },
                { status: 400 }
            );
        }

        if (location && (typeof location !== 'string' || location.length > 200)) {
            return NextResponse.json(
                { error: 'Location must be under 200 characters.' },
                { status: 400 }
            );
        }

        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!sheetId) {
            throw new Error('Missing Google Sheets configuration');
        }

        const auth = getAuthClient();
        const sheets = google.sheets({ version: 'v4', auth });
        const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Sheet1';

        // Check for duplicate email
        const existing = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${tabName}!B:B`,
        });

        const rows = existing.data.values || [];
        const duplicateRowIndex = rows.findIndex(
            (row) => row[0]?.toLowerCase().trim() === email.toLowerCase().trim()
        );

        const timestamp = new Date().toISOString();
        const rowData = [
            fullName.trim(),
            email.toLowerCase().trim(),
            propertyName?.trim() || '',
            location?.trim() || '',
            consent ? 'Yes' : 'No',
            timestamp,
            'Playbook Landing Page',
        ];

        let status: 'created' | 'updated';

        if (duplicateRowIndex > 0) {
            const rowNumber = duplicateRowIndex + 1;
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `${tabName}!A${rowNumber}:G${rowNumber}`,
                valueInputOption: 'USER_ENTERED',
                requestBody: { values: [rowData] },
            });
            status = 'updated';
        } else {
            await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: `${tabName}!A:G`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: [rowData] },
            });
            status = 'created';
        }

        // Issue a time-limited download token tied to this IP
        downloadTokens.set(ip, Date.now() + DOWNLOAD_TOKEN_TTL_MS);

        return NextResponse.json({
            success: true,
            status,
            downloadUrl: '/api/playbook-download',
        });
    } catch (error) {
        console.error('Playbook download API error:', error);

        const message =
            error instanceof Error ? error.message : 'An unexpected error occurred';

        const isConfigError = message.includes('Missing Google');
        return NextResponse.json(
            {
                error: isConfigError
                    ? 'Service temporarily unavailable. Please try again later.'
                    : 'Failed to process your request. Please try again.',
            },
            { status: isConfigError ? 503 : 500 }
        );
    }
}

// Helper to convert Node.js Readable to Web ReadableStream
function nodeReadableToWebStream(nodeStream: Readable): ReadableStream<Uint8Array> {
    return new ReadableStream({
        start(controller) {
            nodeStream.on('data', (chunk: Buffer) => {
                controller.enqueue(new Uint8Array(chunk));
            });
            nodeStream.on('end', () => {
                controller.close();
            });
            nodeStream.on('error', (err) => {
                controller.error(err);
            });
        },
        cancel() {
            nodeStream.destroy();
        },
    });
}

// GET: Stream PDF from Google Drive (only if user has a valid download token)
export async function GET(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // Verify download token
        const tokenExpiry = downloadTokens.get(ip);
        if (!tokenExpiry || Date.now() > tokenExpiry) {
            return NextResponse.json(
                { error: 'Please submit the form first to download the playbook.' },
                { status: 403 }
            );
        }

        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        if (!folderId) {
            throw new Error('Missing Google Drive configuration');
        }

        const auth = getAuthClient();
        const drive = google.drive({ version: 'v3', auth });

        // Find the first PDF in the folder
        const fileList = await drive.files.list({
            q: `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`,
            fields: 'files(id, name)',
            pageSize: 1,
            orderBy: 'modifiedTime desc',
        });

        const files = fileList.data.files;
        if (!files || files.length === 0) {
            throw new Error('No PDF found in the playbook folder');
        }

        const file = files[0];
        const fileName = file.name || 'GatherUp-Playbook.pdf';

        // Stream the file
        const response = await drive.files.get(
            { fileId: file.id!, alt: 'media' },
            { responseType: 'stream' }
        );

        const stream = nodeReadableToWebStream(response.data as Readable);

        return new Response(stream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Playbook file download error:', error);
        return NextResponse.json(
            { error: 'Failed to download the playbook. Please try again.' },
            { status: 500 }
        );
    }
}

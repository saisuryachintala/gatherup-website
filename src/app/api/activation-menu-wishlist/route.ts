import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { ACTIVATIONS } from "@/data/activation-menu";
import { getGoogleAuthClient } from "@/lib/google-auth";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WISHLIST_SPREADSHEET_NAME = "Activation Menu Wishlist";
const WISHLIST_HEADERS = [
  "Submission ID",
  "Submitted At",
  "First Name",
  "Last Name",
  "Work Email",
  "Company",
  "Property Name",
  "Property Location",
  "Goal",
  "Activation Slugs",
  "Activation Names",
  "Source",
];
const GOALS = new Set([
  "",
  "tenant-engagement",
  "amenity-usage",
  "tenant-retention",
  "community",
]);

interface WishlistSubmission {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  propertyName: string;
  propertyLocation: string;
  goal: string;
  activationSlugs: string[];
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function parseSubmission(body: unknown): WishlistSubmission | string {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "A valid wishlist submission is required.";
  }

  const values = body as Record<string, unknown>;
  const requiredFields = [
    ["firstName", "First name", 100],
    ["lastName", "Last name", 100],
    ["email", "Email", 254],
    ["company", "Company", 200],
    ["propertyName", "Property name", 200],
    ["propertyLocation", "Property location", 200],
  ] as const;

  for (const [key, label, maxLength] of requiredFields) {
    const value = values[key];
    if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
      return `${label} is required and must be no more than ${maxLength} characters.`;
    }
  }

  const email = (values.email as string).trim();
  if (!EMAIL_PATTERN.test(email)) {
    return "A valid email address is required.";
  }

  const goal = values.goal === undefined ? "" : values.goal;
  if (typeof goal !== "string" || !GOALS.has(goal)) {
    return "Please select a valid improvement goal.";
  }

  const activationSlugs = values.activationSlugs === undefined ? [] : values.activationSlugs;
  const knownSlugs = new Set(ACTIVATIONS.map((activation) => activation.slug));
  if (!Array.isArray(activationSlugs) || activationSlugs.length > ACTIVATIONS.length) {
    return "The saved activation list is invalid. Refresh the page and try again.";
  }

  const validSlugs = activationSlugs.filter((slug): slug is string => typeof slug === "string");
  if (
    validSlugs.length !== activationSlugs.length ||
    !validSlugs.every((slug) => knownSlugs.has(slug))
  ) {
    return "The saved activation list is invalid. Refresh the page and try again.";
  }

  return {
    firstName: (values.firstName as string).trim(),
    lastName: (values.lastName as string).trim(),
    email: email.toLowerCase(),
    company: (values.company as string).trim(),
    propertyName: (values.propertyName as string).trim(),
    propertyLocation: (values.propertyLocation as string).trim(),
    goal,
    activationSlugs: [...new Set(validSlugs)],
  };
}

async function findWishlistSpreadsheet(
  drive: ReturnType<typeof google.drive>,
  folderId: string,
): Promise<string | undefined> {
  const files = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.spreadsheet' and name='${WISHLIST_SPREADSHEET_NAME}' and trashed=false`,
    fields: "files(id,name,modifiedTime)",
    orderBy: "modifiedTime desc",
    pageSize: 10,
    corpora: "allDrives",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
  });

  const matches = files.data.files ?? [];
  if (matches.length > 1) {
    console.warn(
      `Found ${matches.length} wishlist spreadsheets in the configured Drive folder; using the most recently modified.`,
    );
  }
  return matches[0]?.id || undefined;
}

async function ensureWishlistSheet(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string,
): Promise<void> {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties",
  });
  const existingSheet = spreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === tabName,
  );

  if (!existingSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
    });
  }

  const quotedTabName = `'${tabName.replace(/'/g, "''")}'`;
  const headerRow = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${quotedTabName}!A1:L1`,
  });
  const headers = headerRow.data.values?.[0] ?? [];

  if (headers.length === 0 || headers.every((header) => !header)) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${quotedTabName}!A1:L1`,
      valueInputOption: "RAW",
      requestBody: { values: [WISHLIST_HEADERS] },
    });
    return;
  }

  const hasExpectedHeaders = WISHLIST_HEADERS.every(
    (header, index) => headers[index] === header,
  );
  if (!hasExpectedHeaders) {
    throw new Error(
      `The "${WISHLIST_SPREADSHEET_NAME}" spreadsheet has unexpected headers in the "${tabName}" tab.`,
    );
  }
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    request.headers.get("x-real-ip") ||
    forwardedFor?.split(",").at(-1)?.trim() ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The submission must be valid JSON." }, { status: 400 });
  }

  const submission = parseSubmission(body);
  if (typeof submission === "string") {
    return NextResponse.json({ error: submission }, { status: 400 });
  }

  const folderId = process.env.ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID;
  const serviceAccountEmail = process.env.ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountPrivateKey = process.env.ACTIVATION_MENU_WISHLIST_PRIVATE_KEY;
  if (
    !folderId ||
    !serviceAccountEmail ||
    !serviceAccountPrivateKey
  ) {
    console.error("Activation menu wishlist Google Drive/Sheets configuration is incomplete.");
    return NextResponse.json(
      { error: "Wishlist submission is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const auth = getGoogleAuthClient([
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ], {
      email: serviceAccountEmail,
      privateKey: serviceAccountPrivateKey,
    });
    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: "v3", auth });
    const tabName = process.env.ACTIVATION_MENU_WISHLIST_SHEET_TAB_NAME || "Sheet1";
    const quotedTabName = `'${tabName.replace(/'/g, "''")}'`;
    const folder = await drive.files.get({
      fileId: folderId,
      fields: "id,name,mimeType,trashed",
      supportsAllDrives: true,
    });
    if (
      folder.data.mimeType !== "application/vnd.google-apps.folder" ||
      folder.data.trashed
    ) {
      throw new Error("The configured wishlist Drive folder is missing or invalid.");
    }

    const activationNameBySlug = new Map(
      ACTIVATIONS.map((activation) => [activation.slug, activation.name]),
    );
    const activationNames = submission.activationSlugs.map(
      (slug) => {
        const name = activationNameBySlug.get(slug);
        if (!name) {
          throw new Error("A submitted activation no longer exists in the catalogue.");
        }
        return name;
      },
    );
    const rowData = [
      randomUUID(),
      new Date().toISOString(),
      submission.firstName,
      submission.lastName,
      submission.email,
      submission.company,
      submission.propertyName,
      submission.propertyLocation,
      submission.goal,
      submission.activationSlugs.join(", "),
      activationNames.join(", "),
      "Activation Menu Wishlist",
    ];

    const spreadsheetId = await findWishlistSpreadsheet(drive, folderId);
    if (!spreadsheetId) {
      console.error(
        `Wishlist spreadsheet "${WISHLIST_SPREADSHEET_NAME}" was not found in the configured Drive folder. Create it manually and share it with the wishlist service account.`,
      );
      return NextResponse.json(
        { error: "Wishlist submission is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    await ensureWishlistSheet(sheets, spreadsheetId, tabName);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${quotedTabName}!A:L`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [rowData] },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Activation menu wishlist API error:", error);
    return NextResponse.json(
      { error: "We couldn't submit your wishlist. Please try again." },
      { status: 500 },
    );
  }
}

# GatherUp Wellness Website

Marketing website for GatherUp Wellness — wellness programming for commercial and residential properties.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Icons:** Lucide React, React Icons
- **Deployment:** Vercel
- **Integrations:** Google Sheets API (lead capture)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, value props, testimonials, logos |
| `/about-us` | Founder bio, mission, 5D approach |
| `/our-commercial-solutions` | Commercial property offerings |
| `/our-residential-solutions` | Residential property offerings |
| `/why-it-matters` | Business case for tenant wellness |
| `/playbook` | Tenant Engagement Playbook — lead capture + PDF download |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/playbook-download` | POST | Saves lead data to Google Sheets, issues download token. Rate limiting (5 req/15min per IP), email dedup, server-side validation. |
| `/api/playbook-download` | GET | Streams PDF from Google Drive (private). Requires valid download token from form submission. |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Setup

1. Create a Google Cloud project and enable **Google Sheets API** + **Google Drive API**
2. Create a service account and download the JSON key
3. Share your Google Sheet with the service account email (Editor access)
4. Create a folder in Google Drive, share with service account email (Viewer access)
5. Upload the Playbook PDF into that folder
6. Copy `.env.example` to `.env.local` and fill in the values
7. Add the same variables to Vercel: **Project Settings > Environment Variables**

### Variables

```bash
# Google Service Account (from JSON key file)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Google Sheets (lead capture)
GOOGLE_SHEET_ID=your_sheet_id_from_url
GOOGLE_SHEET_TAB_NAME=Sheet1

# Google Drive (playbook PDF folder - private, shared with service account)
# Create a folder, put your PDF in it. Get folder ID from the URL:
# https://drive.google.com/drive/folders/FOLDER_ID
# To update the PDF: just delete the old one and upload a new one in the same folder.
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id
```

| Variable | Source | Description |
|----------|--------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | JSON key file → `client_email` | Service account email |
| `GOOGLE_PRIVATE_KEY` | JSON key file → `private_key` | Private key (include BEGIN/END markers) |
| `GOOGLE_SHEET_ID` | Sheet URL → `spreadsheets/d/SHEET_ID/edit` | Google Sheet for lead capture |
| `GOOGLE_SHEET_TAB_NAME` | Sheet tab name | Default: `Sheet1` |
| `GOOGLE_DRIVE_FOLDER_ID` | Folder URL → `drive/folders/FOLDER_ID` | Folder containing the Playbook PDF |

## Google Sheet Setup

The Playbook download form writes leads to a Google Sheet with these columns:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Full Name | Email | Property Name | Location | Consent | Timestamp | Source |

Add these headers to row 1 of your Google Sheet.

## Deployment

Deployed via Vercel with GitHub integration. Environment variables must be configured in Vercel project settings.

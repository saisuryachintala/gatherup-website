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
| `/api/playbook-download` | POST | Saves lead data to Google Sheets, then streams the Playbook PDF from Google Drive. Rate limiting (5 req/15min per IP), email dedup, server-side validation. |
| `/api/activation-menu-wishlist` | POST | Validates and appends wishlist submissions to a manually created Google Sheet in a dedicated Drive folder. Rate limiting (5 req/15min per IP). |

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
2. Create or retain the Playbook service account and create a separate wishlist service account; store each key securely
3. Share the Playbook leads spreadsheet with its service account (Editor access)
4. Create a Playbook PDF folder, share it with the Playbook service account (Viewer access), and upload the PDF
5. Create a dedicated Drive folder and manually create the Activation Menu Wishlist spreadsheet inside it; share both with the wishlist service account as Editor
6. Copy `.env.example` to `.env.local` and fill in the values
7. Add the server variables to Vercel: **Project Settings > Environment Variables**

For detailed setup—including Drive permissions, manual spreadsheet creation, local credentials, and secure GitHub Actions-to-Vercel deployment—see [Activation Menu Wishlist Google setup](./docs/activation-menu-wishlist-setup.md).

### Variables

```bash
# Google Service Account (from JSON key file)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Dedicated Google Service Account for wishlist Drive access
ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL=your-wishlist-service-account@your-project.iam.gserviceaccount.com
ACTIVATION_MENU_WISHLIST_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_WISHLIST_KEY_HERE\n-----END PRIVATE KEY-----\n"
ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID=your_wishlist_drive_folder_id
ACTIVATION_MENU_WISHLIST_SHEET_TAB_NAME=Sheet1

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
| `ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL` | Wishlist service-account JSON → `client_email` | Dedicated service account for wishlist Drive and Sheets operations |
| `ACTIVATION_MENU_WISHLIST_PRIVATE_KEY` | Wishlist service-account JSON → `private_key` | Dedicated wishlist private key; keep server-side |
| `GOOGLE_SHEET_ID` | Sheet URL → `spreadsheets/d/SHEET_ID/edit` | Google Sheet for lead capture |
| `GOOGLE_SHEET_TAB_NAME` | Sheet tab name | Default: `Sheet1` |
| `ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID` | Drive folder URL → `drive/folders/FOLDER_ID` | Dedicated folder containing the manually created wishlist spreadsheet |
| `ACTIVATION_MENU_WISHLIST_SHEET_TAB_NAME` | Wishlist sheet tab name | Default: `Sheet1` |
| `GOOGLE_DRIVE_FOLDER_ID` | Folder URL → `drive/folders/FOLDER_ID` | Folder containing the Playbook PDF |

## Google Sheet Setup

The Playbook download form writes leads to a Google Sheet with these columns:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Full Name | Email | Property Name | Location | Consent | Timestamp | Source |

Add these headers to row 1 of your Google Sheet.

The Activation Menu API finds the manually created spreadsheet named `Activation Menu Wishlist` inside the configured Drive folder. It initializes the configured tab (default `Sheet1`) and its headers if needed. Each submission is appended as a new row:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Submission ID | Submitted At | First Name | Last Name | Work Email | Company | Property Name | Property Location | Goal | Activation Slugs | Activation Names | Source |

The wishlist API requires `ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID` and the Google service-account credentials at runtime. If the spreadsheet is missing, the API reports a temporary submission error; create a replacement with the same name in the same folder and it will discover the new spreadsheet ID. If the folder is missing or inaccessible, update its configured ID or permissions.

## Deployment

Deployed via Vercel. Environment variables must be configured in Vercel project settings. For a GitHub Actions deployment setup that keeps Google credentials out of GitHub, see [Activation Menu Wishlist Google setup](./docs/activation-menu-wishlist-setup.md#5-deploy-from-github-actions-without-putting-google-keys-in-github).

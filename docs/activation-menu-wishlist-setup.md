# Activation Menu Wishlist: Setup Guide

This guide connects the Activation Menu wishlist form to Google Drive. The app already sends each submission to a private server endpoint. The endpoint checks the data and adds it to a Google Sheet named **Activation Menu Wishlist** in a Drive folder. No app-code changes are needed for setup.

Google Cloud creates the private service account, Drive stores the spreadsheet, Vercel holds the credentials, and GitHub stores the app code. Do not put Google credentials in GitHub. This guide covers the wishlist form; the separate Playbook download form uses different Google settings.

## 1. Create and configure a Google Cloud project

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project.
2. Enable **Google Sheets API** and **Google Drive API** for that project.
3. If a Playbook service account already exists, leave it unchanged. The wishlist needs its own separate service account.
4. Create a **separate** service account under **IAM & Admin → Service Accounts** for the wishlist, such as `gatherup-wishlist`.
5. Copy the wishlist service-account email. It will look like `name@project-id.iam.gserviceaccount.com`.
6. Open the account's **Keys** tab, choose **Add key → Create new key → JSON**, and download the file. Keep it in a secure password manager or other restricted secret store. Do not commit it or upload the JSON file to GitHub or Vercel.

The wishlist route uses this dedicated account for Google Sheets and Drive operations. Keeping its key separate avoids expanding the Playbook service account's Drive access. No Google credential belongs in client-side code. See Google's guidance for [service accounts](https://cloud.google.com/iam/docs/service-accounts) and [Drive shared-drive support](https://developers.google.com/workspace/drive/api/guides/about-shareddrives).

## 2. Create the Drive folder and spreadsheet

Create a dedicated folder in your personal Google Drive that contains only the Activation Menu wishlist spreadsheet. Copy the wishlist service account email, then share the folder with it as an **Editor**. Record the folder ID from the URL:

```text
https://drive.google.com/drive/folders/FOLDER_ID
```

Create a Google spreadsheet yourself in that folder and name it exactly **Activation Menu Wishlist**. Share the spreadsheet directly with the wishlist service account as an **Editor** as well. This makes the sheet human-owned in your personal Drive, while the API uses the service account only to find it and append rows.

In its first tab, either leave row 1 empty or add the expected twelve headers listed in the README. The API creates the configured tab and writes those headers if the tab is missing or its first row is blank. If row 1 already contains different headers, the API will stop rather than overwrite them.

Do not share either item publicly. The API needs Sheets write access and Drive metadata read access to locate the named spreadsheet, but it does not need permission to create or delete Drive files.

### Recovery behavior

- If the named spreadsheet is not in the configured folder, the API returns a service-unavailable response and logs an instruction to create it. Submissions are not silently discarded.
- If the spreadsheet is deleted and then recreated with the same name in that folder, the API finds the new ID automatically.
- If multiple matching spreadsheets exist, the API uses the most recently modified one and logs a warning. Remove obsolete duplicates so submissions do not go to an unintended sheet.
- If the folder itself is deleted, create a replacement folder, move/recreate the spreadsheet there, share both with the service account, and update `ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID`.
- Keep the spreadsheet name `Activation Menu Wishlist` and the folder ID stable. Renaming or moving the spreadsheet outside the configured folder makes it undiscoverable.
- A non-empty sheet with different headers is not overwritten; the API reports a submission failure for investigation.

## 3. Optional: Configure local development (developers only)

Skip this section if you only need to configure the live website. Production settings belong in Vercel in step 4.

Copy the template and set values in the ignored `.env.local` file:

```bash
cp .env.example .env.local
```

Use the Playbook JSON key's `client_email` for `GOOGLE_SERVICE_ACCOUNT_EMAIL` and its `private_key` for `GOOGLE_PRIVATE_KEY`. Use the **wishlist** JSON key values for `ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL` and `ACTIVATION_MENU_WISHLIST_PRIVATE_KEY`. The keys may be entered with real line breaks or escaped `\n` characters; the server normalizes escaped newlines.

Set:

```dotenv
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL=your-wishlist-service-account@your-project.iam.gserviceaccount.com
ACTIVATION_MENU_WISHLIST_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_WISHLIST_KEY\n-----END PRIVATE KEY-----\n"
ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID=your_dedicated_folder_id
ACTIVATION_MENU_WISHLIST_SHEET_TAB_NAME=Sheet1
```

The tab variable is optional and defaults to `Sheet1`. Google Sheets tab names must be valid and match the configured value exactly.

The Playbook integration separately requires `GOOGLE_SHEET_ID` and `GOOGLE_DRIVE_FOLDER_ID` as shown in `.env.example`. Do not confuse the Playbook PDF folder with the wishlist folder.

`.env.local` is ignored by Git. Never paste the private key into source code, a checked-in workflow file, a build log, an issue, or a pull request.

## 4. Store production variables in Vercel

1. Open the Vercel project and go to **Settings → Environment Variables**.
2. Add these four **server-side** variables. Do not prefix them with `NEXT_PUBLIC_`:

  | Name | Value |
  |---|---|
  | `ACTIVATION_MENU_WISHLIST_SERVICE_ACCOUNT_EMAIL` | The `client_email` value from the wishlist service-account JSON key |
  | `ACTIVATION_MENU_WISHLIST_PRIVATE_KEY` | The `private_key` value from that JSON key |
  | `ACTIVATION_MENU_WISHLIST_DRIVE_FOLDER_ID` | The folder ID copied from the Drive folder URL |
  | `ACTIVATION_MENU_WISHLIST_SHEET_TAB_NAME` | Optional. The tab name, usually `Sheet1`; defaults to `Sheet1` if omitted |

3. Set the first three variables for **Production**. Add them to **Preview** only if preview versions of the form should save data; use a separate test folder and spreadsheet for previews.
4. Save the variables and redeploy so the deployment uses the updated environment.

The Playbook download form has separate variables (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_TAB_NAME`, and `GOOGLE_DRIVE_FOLDER_ID`). Do not use those in place of the wishlist variables. They are only needed if the Playbook form and PDF download are also being configured.

Vercel stores project environment variables encrypted and provides them to the server runtime. See [Vercel environment variables](https://vercel.com/docs/environment-variables). Restrict project/team access to people who are authorized to manage production secrets. Rotate the service-account key in Google Cloud and update Vercel if it is exposed.

## 5. Connect GitHub and Vercel

GitHub stores the app code. Vercel runs the live website and securely stores the Google credentials. This repository does not need a separate GitHub Actions workflow for this integration.

1. In Vercel, open the project and go to **Settings → Git**. Confirm that it is connected to the correct GitHub repository.
2. Check which Git branch Vercel lists as the **Production Branch**. This branch publishes changes to the live website.
3. After the Google Drive and Vercel settings are ready, publish the app changes to that branch in GitHub. Vercel should start a deployment automatically. If this repository is not connected yet, use **Add New → Project** in Vercel, choose the GitHub repository, and follow the prompts.
4. Wait for the deployment in Vercel to show **Ready** before testing the live form.

Never add the service-account email or private key to GitHub files, GitHub repository secrets, source code, or pull requests. The app reads these credentials from Vercel at runtime.

### Advanced and optional: GitHub Actions deployment

Skip this section unless your team specifically requires GitHub Actions to deploy the site. The standard Vercel Git connection in step 5 does not need these steps or GitHub secrets.

There is no GitHub Actions workflow in this repository currently. If you use Actions to deploy, the safest division is:

- **Google secrets and folder configuration:** Vercel Project → Settings → Environment Variables.
- **Deployment credentials only:** GitHub repository/environment secrets for the Vercel CLI.

This lets Vercel perform the remote build with its project environment. The workflow should not run `vercel pull` or copy the Google private key into GitHub Actions. Add these GitHub secrets:

| GitHub secret | Value |
|---|---|
| `VERCEL_TOKEN` | A Vercel token scoped to the team/account that owns this project; use the narrowest practical access |
| `VERCEL_ORG_ID` | Vercel team/account ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

The organization and project IDs can be obtained from Vercel project settings or from `.vercel/project.json` after linking the repository locally. IDs are identifiers, not Google credentials, but storing them as secrets keeps the workflow configuration simple.
Store these as secrets in a protected GitHub `production` environment rather than exposing them to every workflow/branch. GitHub documents [Actions secrets](https://docs.github.com/actions/security-guides/using-secrets-in-github-actions).

Example production workflow steps (adjust the branch and Node version to match your deployment policy):

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install --global vercel@latest # Pin a reviewed CLI version for production use.
      - name: Link Vercel project
        run: vercel link --yes --project "$VERCEL_PROJECT_ID" --scope "$VERCEL_ORG_ID" --token "$VERCEL_TOKEN"
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      - name: Deploy production
        run: vercel deploy --prod --scope "$VERCEL_ORG_ID" --token "$VERCEL_TOKEN"
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

The Vercel CLI uploads the source and Vercel builds it using the project's configured environment variables. Do not enable shell tracing (`set -x`) or print environment variables. Protect the GitHub `production` environment with branch restrictions and required approvals where appropriate. Do not expose deployment secrets to untrusted pull-request code; never use `pull_request_target` to check out and execute an untrusted PR with secrets available.

This repository currently has no Actions workflow, and the README describes Vercel's GitHub integration. Choose one production deployment trigger: if adding the Actions workflow above, disable automatic production deployments from Vercel's Git integration to avoid duplicate deployments.

If you choose a workflow that runs `vercel pull` and builds on the GitHub runner instead, the pulled Vercel variables—including Google credentials—will be present on that runner during the build. Keep that workflow restricted to trusted branches and protected environments. Avoid that pattern when a remote Vercel build is available.

## 6. Verify setup

1. Confirm the Vercel deployment is **Ready**.
2. Open `/activation-menu/wishlist`, save an activation if desired, and submit a test entry. The form can also be submitted without saved activations.
3. Confirm the page shows its thank-you message.
4. Open the configured Drive folder and spreadsheet. The app creates the configured tab and twelve column headers the first time, then adds the test submission as a new row.
5. Remove the test row if it contains real contact details. Keep the Drive folder private and share it only with people who should access submissions.

If a submission fails, check Vercel function logs for the server-side Google API error. The public response intentionally does not expose credential, permission, or spreadsheet internals.

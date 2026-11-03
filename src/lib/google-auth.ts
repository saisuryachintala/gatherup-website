import { google } from "googleapis";

interface GoogleServiceAccountCredentials {
  email?: string;
  privateKey?: string;
}

export function getGoogleAuthClient(
  scopes: string[],
  credentials?: GoogleServiceAccountCredentials,
) {
  const email = credentials?.email ?? process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = credentials?.privateKey ?? process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error("Missing Google service account configuration");
  }

  return new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes,
  });
}

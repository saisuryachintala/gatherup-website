import type { NextConfig } from "next";

// Validate required environment variables at build time
const requiredEnvVars = [
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_SHEET_ID',
  'GOOGLE_DRIVE_FOLDER_ID',
] as const;

const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}\n\nSee .env.example for setup instructions.`
  );
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/our-solutions',
        destination: '/our-commercial-solutions',
        permanent: true,
      },
      {
        source: '/our-solutions/residential',
        destination: '/our-residential-solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

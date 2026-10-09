const LOCALHOST_URL = "http://localhost:3000";

/** Absolute origin of the site, without a trailing slash. Safe on server and client. */
export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return LOCALHOST_URL;
}

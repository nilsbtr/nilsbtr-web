import "server-only";

const LOCALHOST_URL = "http://localhost:3000";

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}

function getVercelUrl() {
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
}

export function getSiteUrl() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? getVercelUrl() ?? LOCALHOST_URL);
}

export function getAuthUrl() {
  return normalizeUrl(process.env.BETTER_AUTH_URL ?? getVercelUrl() ?? getSiteUrl());
}

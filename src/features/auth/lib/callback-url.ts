/**
 * Resolves the post-login destination from an untrusted query value. Only
 * same-origin paths are accepted, so the login page can't be used as an open
 * redirect.
 */
export function getSafeCallbackUrl(raw: string | null, fallback = "/") {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return fallback;
}

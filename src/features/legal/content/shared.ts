/** Date of the current version of the privacy policy. Update it with every change to the text. */
export const PRIVACY_POLICY_UPDATED = new Date("2026-10-13T12:00:00+02:00");

/** Anchor of the analytics section, linked from the consent prompt. */
export const ANALYTICS_SECTION_ID = "analytics";

/** Service providers that process data on the site's behalf. */
export const PROCESSORS = {
  vercel: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },
  neon: {
    name: "Neon, Inc.",
    privacyUrl: "https://neon.com/privacy-policy",
  },
} as const;

/** The German data protection authorities, for finding the one in charge. */
export const SUPERVISORY_AUTHORITIES_URL =
  "https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html";

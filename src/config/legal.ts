import "server-only";

import { siteConfig } from "./site";

/**
 * Who runs the site, as the privacy policy has to name the controller and how
 * to reach them (Art. 13 GDPR). The details come from the environment so they
 * stay out of the repository. They are read when the privacy policy is
 * rendered, which for this static page is at build time.
 */
export type Operator = {
  name: string;
  /** Postal address, one line per entry. Optional: an email address is enough to reach the controller. */
  address: string[] | null;
  email: string | null;
  phone: string | null;
};

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getOperator(): Operator {
  const address = readEnv("LEGAL_ADDRESS");

  return {
    name: readEnv("LEGAL_NAME") ?? siteConfig.name,
    // Written on one line in the environment, with commas between the lines.
    address: address
      ? address
          .split(",")
          .map((line) => line.trim())
          .filter(Boolean)
      : null,
    email: readEnv("LEGAL_EMAIL"),
    phone: readEnv("LEGAL_PHONE"),
  };
}

import "server-only";

import { siteConfig } from "./site";

/**
 * Who runs the site, as the imprint and the privacy policy have to name them.
 * The details come from the environment so a home address stays out of the
 * repository. They are read when the legal pages are rendered, which for these
 * static pages is at build time.
 */
export type Operator = {
  name: string;
  /** Postal address, one line per entry. */
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

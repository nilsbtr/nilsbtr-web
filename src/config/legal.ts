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
  email: string | null;
  phone: string | null;
};

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getOperator(): Operator {
  return {
    name: readEnv("LEGAL_NAME") ?? siteConfig.name,
    email: readEnv("LEGAL_EMAIL"),
    phone: readEnv("LEGAL_PHONE"),
  };
}

import type { Metadata } from "next";

import { getOperator } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/features/legal/components/legal-page";
import { getPrivacySectionsDe } from "@/features/legal/content/privacy-de";
import { PRIVACY_POLICY_UPDATED } from "@/features/legal/content/shared";

const TITLE = "Datenschutzerklärung";
const DESCRIPTION =
  "Welche Daten beim Besuch dieser Website und bei der Nutzung eines Kontos verarbeitet werden, wozu, und welche Rechte Sie haben.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/datenschutz",
    languages: { de: "/datenschutz", en: "/privacy" },
  },
  openGraph: {
    title: `${TITLE} · ${siteConfig.name}`,
    description: DESCRIPTION,
    locale: "de_DE",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      lang="de"
      eyebrow="Rechtliches"
      title={TITLE}
      description={DESCRIPTION}
      updated={PRIVACY_POLICY_UPDATED}
      alternate={{ lang: "en", href: "/privacy", label: "Read in English" }}
      sections={getPrivacySectionsDe(getOperator())}
    />
  );
}

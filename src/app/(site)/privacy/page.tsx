import type { Metadata } from "next";

import { getOperator } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { ProseLink } from "@/features/legal/components/blocks";
import { LegalPage } from "@/features/legal/components/legal-page";
import { getPrivacySectionsEn } from "@/features/legal/content/privacy-en";
import { PRIVACY_POLICY_UPDATED } from "@/features/legal/content/shared";

const TITLE = "Privacy policy";
const DESCRIPTION =
  "What data is processed when you visit this website or use an account, why, and what rights you have.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy",
    languages: { de: "/datenschutz", en: "/privacy" },
  },
  openGraph: {
    title: `${TITLE} · ${siteConfig.name}`,
    description: DESCRIPTION,
  },
};

export default function PrivacyPolicyEnglishPage() {
  return (
    <LegalPage
      lang="en"
      eyebrow="Legal"
      title={TITLE}
      description={DESCRIPTION}
      updated={PRIVACY_POLICY_UPDATED}
      alternate={{ lang: "de", href: "/datenschutz", label: "Auf Deutsch lesen" }}
      notice={
        <p className="rounded-xl border border-border/60 bg-card/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          This is a courtesy translation. Only the{" "}
          <ProseLink href="/datenschutz">German version</ProseLink> is legally binding.
        </p>
      }
      sections={getPrivacySectionsEn(getOperator())}
    />
  );
}

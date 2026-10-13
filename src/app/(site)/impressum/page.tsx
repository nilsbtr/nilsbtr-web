import type { Metadata } from "next";

import { getOperator } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/features/legal/components/legal-page";
import { getImprintSections } from "@/features/legal/content/imprint";
import { IMPRINT_UPDATED } from "@/features/legal/content/shared";

const TITLE = "Impressum";
const DESCRIPTION = "Anbieterkennzeichnung und Kontakt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} · ${siteConfig.name}`,
    description: DESCRIPTION,
    locale: "de_DE",
  },
};

export default function ImprintPage() {
  return (
    <LegalPage
      lang="de"
      eyebrow="Rechtliches"
      title={TITLE}
      description={DESCRIPTION}
      updated={IMPRINT_UPDATED}
      sections={getImprintSections(getOperator())}
    />
  );
}

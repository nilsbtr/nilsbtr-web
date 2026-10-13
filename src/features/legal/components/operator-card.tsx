import { Location01Icon, Mail01Icon, SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { Surface } from "@/components/shared/surface";
import type { Operator } from "@/config/legal";

import type { LegalLanguage } from "../types";
import { Missing, ProseLink } from "./blocks";

const LABELS = {
  de: { address: "Anschrift", email: "E-Mail", phone: "Telefon", missing: "fehlt" },
  en: { address: "Address", email: "Email", phone: "Phone", missing: "missing" },
} as const;

function Row({
  icon,
  label,
  children,
}: {
  icon: IconSvgElement;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <HugeiconsIcon
        icon={icon}
        strokeWidth={1.75}
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-brand"
      />
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd className="text-foreground/90">{children}</dd>
      </div>
    </div>
  );
}

/** Name and contact details of whoever runs the site, as a small address card. */
export function OperatorCard({ operator, lang }: { operator: Operator; lang: LegalLanguage }) {
  const labels = LABELS[lang];

  return (
    <Surface className="p-5 sm:p-6">
      <p className="font-serif text-lg text-foreground">{operator.name}</p>
      <dl className="mt-4 grid gap-3 text-sm not-italic">
        {operator.address && (
          <Row icon={Location01Icon} label={labels.address}>
            <address className="not-italic">
              {operator.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Row>
        )}
        <Row icon={Mail01Icon} label={labels.email}>
          {operator.email ? (
            <ProseLink href={`mailto:${operator.email}`}>{operator.email}</ProseLink>
          ) : (
            <Missing>LEGAL_EMAIL {labels.missing}</Missing>
          )}
        </Row>
        {operator.phone && (
          <Row icon={SmartPhone01Icon} label={labels.phone}>
            <ProseLink href={`tel:${operator.phone.replace(/[^\d+]/g, "")}`}>
              {operator.phone}
            </ProseLink>
          </Row>
        )}
      </dl>
    </Surface>
  );
}

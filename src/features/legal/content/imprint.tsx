import type { Operator } from "@/config/legal";

import { P, ProseLink, Ref } from "../components/blocks";
import { OperatorCard } from "../components/operator-card";
import type { LegalSection } from "../types";

/** The imprint (Impressum) required by § 5 DDG. */
export function getImprintSections(operator: Operator): LegalSection[] {
  return [
    {
      id: "anbieter",
      title: "Angaben gemäß § 5 DDG",
      content: <OperatorCard operator={operator} lang="de" />,
    },
    {
      id: "verantwortlich",
      title: "Verantwortlich für den Inhalt",
      content: (
        <P>
          Verantwortlich für den Inhalt nach <Ref>§ 18 Abs. 2 MStV</Ref> ist {operator.name},
          Anschrift wie oben.
        </P>
      ),
    },
    {
      id: "datenschutz",
      title: "Datenschutz",
      content: (
        <P>
          Wie ich mit Ihren Daten umgehe, erfahren Sie in der{" "}
          <ProseLink href="/datenschutz">Datenschutzerklärung</ProseLink>.
        </P>
      ),
    },
  ];
}

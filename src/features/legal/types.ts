import type { ReactNode } from "react";

export type LegalLanguage = "de" | "en";

/** One numbered section of a legal page. */
export type LegalSection = {
  /** Anchor of the section, so it can be linked to directly. */
  id: string;
  title: string;
  content: ReactNode;
};

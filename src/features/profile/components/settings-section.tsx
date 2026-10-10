import { type ReactNode, useId } from "react";

import { SectionHeader } from "@/components/layout/section-header";
import { RevealItem } from "@/components/motion";
import { Surface } from "@/components/shared/surface";

/**
 * One group of settings on the profile page: a titled panel holding a form.
 * Must be rendered inside a RevealGroup, where it is one beat of the sequence.
 */
export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const headingId = useId();

  return (
    <RevealItem as="section" aria-labelledby={headingId}>
      <Surface className="p-6">
        <SectionHeader id={headingId} title={title} description={description} />
        <div className="mt-6">{children}</div>
      </Surface>
    </RevealItem>
  );
}

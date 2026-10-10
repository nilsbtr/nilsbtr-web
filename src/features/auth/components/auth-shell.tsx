import type { ReactNode } from "react";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion";
import { SubmitButton, type SubmitButtonProps } from "@/components/shared/submit-button";
import { Surface } from "@/components/shared/surface";
import { TextLink } from "@/components/shared/text-link";

/**
 * Shared frame of every auth screen. It uses the same page header as the rest
 * of the site and holds the form in a regular surface.
 */
export function AuthShell({
  title,
  description,
  footer,
  children,
}: {
  title: ReactNode;
  description: ReactNode;
  /** Shown below the surface, e.g. a link to the other auth screen. */
  footer?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <RevealGroup>
      <PageHeader eyebrow="Account" title={title}>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      {children && (
        <RevealItem className="mt-8">
          <Surface className="p-6">{children}</Surface>
        </RevealItem>
      )}
      {footer && (
        <RevealItem variant="fade" className="mt-6">
          {footer}
        </RevealItem>
      )}
    </RevealGroup>
  );
}

/** The full-width submit button that closes an auth form. */
export function AuthSubmitButton(props: SubmitButtonProps) {
  return <SubmitButton size="lg" className="mt-2 w-full" {...props} />;
}

/** Line pointing to the other auth screen, e.g. "Already have an account? Sign in". */
export function AuthSwitchLink({
  prompt,
  href,
  children,
}: {
  prompt: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      {prompt} <TextLink href={href}>{children}</TextLink>
    </p>
  );
}

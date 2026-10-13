import { Download04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { TextLink } from "@/components/shared/text-link";
import { Button } from "@/components/ui/button";

import { SettingsSection } from "./settings-section";

/** Where the copy of the user's data is served from. */
const EXPORT_URL = "/api/account/export";

/** The user's copy of their data (Art. 15 and 20 GDPR), and how it is handled. */
export function DataSection() {
  return (
    <SettingsSection
      title="Your data"
      description="Download everything stored about your account as a machine-readable file."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-pretty text-muted-foreground">
          Your profile, sign-in sessions and invites, as JSON. Read how your data is handled in the{" "}
          <TextLink href="/privacy">privacy policy</TextLink>.
        </p>
        <Button
          variant="outline"
          className="shrink-0"
          nativeButton={false}
          render={<a href={EXPORT_URL} download />}
        >
          <HugeiconsIcon icon={Download04Icon} strokeWidth={2} data-icon="inline-start" />
          Download my data
        </Button>
      </div>
    </SettingsSection>
  );
}

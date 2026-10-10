import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { ProfileSettings } from "@/features/profile/components/profile-settings";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <PageShell size="md">
      <ProfileSettings />
    </PageShell>
  );
}

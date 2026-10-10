"use client";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { RevealGroup } from "@/components/motion";
import { Skeleton } from "@/components/ui/skeleton";

import { useSessionUser } from "../hooks/use-session-user";
import { PasswordForm } from "./password-form";
import { ProfileForm } from "./profile-form";

function ProfileSkeleton() {
  return (
    <div role="status" aria-label="Loading your profile">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-4 h-10 w-36" />
      <Skeleton className="mt-4 h-5 w-full max-w-sm" />
      <Skeleton className="mt-8 h-112 rounded-xl" />
      <Skeleton className="mt-6 h-80 rounded-xl" />
    </div>
  );
}

/** The signed-in user's account settings: who they are, and how they sign in. */
export function ProfileSettings() {
  const user = useSessionUser();

  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <RevealGroup>
      <PageHeader eyebrow="Account" title="Your profile">
        <PageHeaderDescription>
          Choose how you appear on the site and keep your sign-in details up to date.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mt-8 grid gap-6">
        <ProfileForm user={user} />
        <PasswordForm user={user} />
      </div>
    </RevealGroup>
  );
}

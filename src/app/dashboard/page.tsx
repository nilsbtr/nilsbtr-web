"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { ADMIN_ROLE } from "@/lib/permissions";

import { InvitesTab } from "./_components/invites-tab";
import { DashboardSkeleton } from "./_components/skeletons";
import { UsersTab } from "./_components/users-tab";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const isAdmin = session?.user?.role?.split(",").some((r) => r.trim() === ADMIN_ROLE);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) {
      router.replace("/login?callbackURL=/dashboard");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
  }, [session, sessionLoading, isAdmin, router]);

  if (sessionLoading) {
    return <DashboardSkeleton />;
  }

  if (!session || !isAdmin) {
    return null;
  }

  return (
    <div className="mx-auto min-h-dvh max-w-4xl px-4 pt-20 pb-12 sm:px-6">
      <div className="mb-6">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage users, roles, and invitations.</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab currentUserId={session.user.id} />
        </TabsContent>
        <TabsContent value="invites">
          <InvitesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

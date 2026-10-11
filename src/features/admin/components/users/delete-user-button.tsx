"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { DASHBOARD_ROUTES } from "../../lib/routes";
import type { Person } from "../../types";
import { RemoveUserDialog } from "./remove-user-dialog";

/** Deletes a user from their own page, then returns to the list, as the page is gone with them. */
export function DeleteUserButton({ user }: { user: Person }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <RemoveUserDialog
        user={user}
        open={open}
        onOpenChange={setOpen}
        onRemoved={() => router.replace(DASHBOARD_ROUTES.users)}
      />
    </>
  );
}

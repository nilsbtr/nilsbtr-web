import Link from "next/link";

import { UserRemove01Icon } from "@hugeicons/core-free-icons";

import { Surface } from "@/components/shared/surface";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/admin/components/empty-state";
import { DashboardPage, DashboardSection } from "@/features/admin/components/shell/dashboard-page";
import { DASHBOARD_ROUTES } from "@/features/admin/lib/routes";

export default function UserNotFound() {
  return (
    <DashboardPage>
      <DashboardSection>
        <Surface>
          <EmptyState
            icon={UserRemove01Icon}
            title="User not found"
            description="There is no user at this address. Their account may have been deleted."
          >
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={DASHBOARD_ROUTES.users} />}
            >
              Back to users
            </Button>
          </EmptyState>
        </Surface>
      </DashboardSection>
    </DashboardPage>
  );
}

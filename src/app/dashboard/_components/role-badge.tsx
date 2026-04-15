import { Badge } from "@/components/ui/badge";
import { ADMIN_ROLE } from "@/lib/permissions";

export function RoleBadge({ role }: { role: string | null }) {
  if (!role) return <Badge variant="outline">None</Badge>;
  const variant = role.includes(ADMIN_ROLE) ? "default" : "secondary";
  return <Badge variant={variant}>{role}</Badge>;
}

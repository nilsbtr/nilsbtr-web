import { InviteActivation } from "@/features/auth/components/invite-activation";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return <InviteActivation token={token} />;
}

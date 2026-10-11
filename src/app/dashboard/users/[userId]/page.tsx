import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UserDetails } from "@/features/admin/components/users/user-details";
import { requireAdmin } from "@/features/admin/server/session";
import { getUser } from "@/features/admin/server/users";

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUser(userId);

  return { title: user?.name ?? "User not found" };
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params;
  const [admin, user] = await Promise.all([requireAdmin(), getUser(userId)]);

  if (!user) notFound();

  return <UserDetails user={user} isSelf={user.id === admin.user.id} />;
}

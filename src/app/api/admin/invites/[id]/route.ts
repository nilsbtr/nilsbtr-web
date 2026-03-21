import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { requireAdmin } from "@/lib/admin";
import { invitation } from "@/lib/auth-schema";
import { db } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { id } = await params;

  await db.delete(invitation).where(eq(invitation.id, id));

  return NextResponse.json({ success: true });
}

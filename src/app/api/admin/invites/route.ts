import { NextResponse } from "next/server";

import { desc } from "drizzle-orm";

import { invitation } from "@/lib/auth-schema";
import { db } from "@/lib/db";
import { generateInviteToken, hashInviteCode } from "@/lib/invite";
import { requireAdmin } from "@/lib/admin";
import { createInviteSchema } from "@/lib/validations";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const invites = await db
    .select()
    .from(invitation)
    .orderBy(desc(invitation.createdAt));

  return NextResponse.json({ invites });
}

export async function POST(request: Request) {
  const { session, error } = await requireAdmin();
  if (error || !session)
    return NextResponse.json({ error }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const parsed = createInviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input.", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { maxUses, expiresInHours } = parsed.data;
  const token = generateInviteToken();
  const codeHash = hashInviteCode(token);
  const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

  const id = crypto.randomUUID();

  await db.insert(invitation).values({
    id,
    codeHash,
    maxUses,
    expiresAt,
    createdBy: session.user.id,
  });

  return NextResponse.json({ id, token, expiresAt, maxUses });
}

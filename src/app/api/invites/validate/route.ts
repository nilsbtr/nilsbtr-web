import { NextResponse } from "next/server";

import { user } from "@/lib/auth-schema";
import { db } from "@/lib/db";
import { validateInviteCode } from "@/lib/invite";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code.trim() : "";

  const userCount = await db
    .select({ id: user.id })
    .from(user)
    .limit(1)
    .then((rows) => rows.length);

  if (userCount === 0) {
    return NextResponse.json({ valid: true, bootstrap: true });
  }

  if (!code) {
    return NextResponse.json({ valid: false, error: "Missing invite code." });
  }

  const result = await validateInviteCode(code);

  return NextResponse.json({
    valid: result.valid,
    error: result.valid ? undefined : result.error,
  });
}

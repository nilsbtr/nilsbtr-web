import { NextResponse } from "next/server";

import { validateInviteCode } from "@/lib/invite";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code.trim() : "";

  if (!code) {
    return NextResponse.json({ valid: false, error: "Missing invite code." });
  }

  const result = await validateInviteCode(code);

  return NextResponse.json({
    valid: result.valid,
    error: result.valid ? undefined : result.error,
  });
}

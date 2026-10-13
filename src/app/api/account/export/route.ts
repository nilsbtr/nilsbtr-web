import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { collectAccountData } from "@/features/profile/server/export";
import { auth } from "@/server/auth";

/** Hands the signed-in user a JSON file with everything stored about them. */
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Sign in to download your data." }, { status: 401 });
  }

  const data = await collectAccountData(session.user.id);

  if (!data) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const date = data.exportedAt.slice(0, 10);
  const filename = `${siteConfig.handle}-account-data-${date}.json`;

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

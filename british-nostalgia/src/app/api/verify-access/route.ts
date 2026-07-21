import { NextRequest, NextResponse } from "next/server";
import {
  DOWNLOAD_ACCESS_COOKIE,
  verifyDownloadToken,
} from "@/lib/download-token";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const accessToken =
    request.nextUrl.searchParams.get("access") ??
    request.cookies.get(DOWNLOAD_ACCESS_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { entitled: false, entitledSlugs: [], reason: "missing_token" },
      { status: 400 }
    );
  }

  const payload = verifyDownloadToken(accessToken);
  if (!payload) {
    return NextResponse.json({
      entitled: false,
      entitledSlugs: [],
      reason: "invalid_token",
    });
  }

  return NextResponse.json({
    entitled: true,
    entitledSlugs: payload.entitledSlugs,
    reason: "paid",
  });
}

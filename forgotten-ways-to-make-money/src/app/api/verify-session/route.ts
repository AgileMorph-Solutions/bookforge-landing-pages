import { NextRequest, NextResponse } from "next/server";
import {
  createDownloadToken,
  DOWNLOAD_ACCESS_COOKIE,
  getDownloadAccessCookieOptions,
} from "@/lib/download-token";
import { DownloadTokenConfigError } from "@/lib/env";
import type { DownloadableSlug } from "@/lib/entitlements";
import { verifySessionEntitlement } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const result = await verifySessionEntitlement(sessionId);

  if (!result.entitled) {
    return NextResponse.json({
      entitled: false,
      entitledSlugs: [],
      reason: result.reason,
    });
  }

  try {
    const accessToken = createDownloadToken(
      result.entitledSlugs as DownloadableSlug[],
      sessionId
    );

    const response = NextResponse.json({
      entitled: true,
      entitledSlugs: result.entitledSlugs,
      customerEmail: result.customerEmail,
      accessToken,
      reason: result.reason,
    });

    response.cookies.set(
      DOWNLOAD_ACCESS_COOKIE,
      accessToken,
      getDownloadAccessCookieOptions()
    );

    return response;
  } catch (error) {
    if (error instanceof DownloadTokenConfigError) {
      return NextResponse.json(
        { error: "Download access not configured. Contact support." },
        { status: 503 }
      );
    }
    throw error;
  }
}

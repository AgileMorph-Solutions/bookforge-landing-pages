import { NextRequest, NextResponse } from "next/server";
import {
  DOWNLOAD_ACCESS_COOKIE,
  isSlugEntitledInToken,
} from "@/lib/download-token";
import {
  isValidDownloadSlug,
  type DownloadableSlug,
} from "@/lib/entitlements";
import { INDIVIDUAL_BOOKS } from "@/lib/products";
import { getProductDownloadAsset } from "@/lib/products.server";
import { verifySessionEntitlement } from "@/lib/session";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function pdfFilenameFor(slug: string): string {
  return (
    INDIVIDUAL_BOOKS.find((b) => b.slug === slug)?.pdfFilename ?? `${slug}.pdf`
  );
}

/**
 * The PDF is served exclusively from Sanity — redirect to its CDN URL with
 * `?dl=` so the browser saves it as an attachment with a friendly name. A 302
 * avoids streaming 30–70MB PDFs through the function. There is no local /
 * bundled-asset fallback: if Sanity has no file for this slug we fail loudly.
 */
async function getSanityPdfRedirect(
  slug: DownloadableSlug,
  filename: string
): Promise<NextResponse | null> {
  const asset = await getProductDownloadAsset(slug);
  if (!asset?.pdfUrl) return null;

  try {
    const url = new URL(asset.pdfUrl);
    url.searchParams.set("dl", asset.pdfFilename ?? filename);
    return NextResponse.redirect(url.toString(), 302);
  } catch (error) {
    console.error("Sanity PDF redirect failed:", error);
    return null;
  }
}

async function isAuthorized(
  request: NextRequest,
  slug: string
): Promise<boolean> {
  const accessToken =
    request.nextUrl.searchParams.get("access") ??
    request.cookies.get(DOWNLOAD_ACCESS_COOKIE)?.value;

  if (accessToken && (await isValidDownloadSlug(slug))) {
    return isSlugEntitledInToken(accessToken, slug as DownloadableSlug);
  }

  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (sessionId) {
    const { entitled } = await verifySessionEntitlement(sessionId, slug);
    return entitled;
  }

  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!(await isValidDownloadSlug(slug))) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const downloadSlug = slug as DownloadableSlug;

  const entitled = await isAuthorized(request, slug);
  if (!entitled) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const filename = pdfFilenameFor(slug);
  const response = await getSanityPdfRedirect(downloadSlug, filename);

  if (!response) {
    return NextResponse.json(
      { error: "PDF unavailable in Sanity. Contact support." },
      { status: 502 }
    );
  }

  return response;
}

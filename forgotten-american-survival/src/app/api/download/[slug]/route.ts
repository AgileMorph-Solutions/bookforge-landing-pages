import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { head } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";
import {
  DOWNLOAD_ACCESS_COOKIE,
  isSlugEntitledInToken,
} from "@/lib/download-token";
import {
  getPdfBlobPath,
  isValidDownloadSlug,
  type DownloadableSlug,
} from "@/lib/entitlements";
import { INDIVIDUAL_BOOKS } from "@/lib/products";
import { getProductDownloadAsset } from "@/lib/products.server";
import { verifySessionEntitlement } from "@/lib/session";

export const dynamic = "force-dynamic";
/** Large cookbook PDFs (30–70MB) need a long-running function. */
export const maxDuration = 60;

const NETLIFY_PDF_STORE = "cookbook-pdfs";

function pdfFilenameFor(slug: string): string {
  return (
    INDIVIDUAL_BOOKS.find((b) => b.slug === slug)?.pdfFilename ?? `${slug}.pdf`
  );
}

function pdfResponse(
  body: BodyInit,
  filename: string,
  extraHeaders?: HeadersInit
): NextResponse {
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      ...extraHeaders,
    },
  });
}

async function getNetlifyBlobPdfResponse(
  slug: DownloadableSlug,
  filename: string
): Promise<NextResponse | null> {
  try {
    const store = getStore(NETLIFY_PDF_STORE);
    const data = await store.get(slug, { type: "stream" });
    if (!data) return null;
    return pdfResponse(data as unknown as BodyInit, filename);
  } catch (err) {
    console.error("Netlify Blobs PDF read failed:", err);
    return null;
  }
}

async function getLocalPdfResponse(
  slug: string,
  filename: string
): Promise<NextResponse | null> {
  const book = INDIVIDUAL_BOOKS.find((b) => b.slug === slug);
  if (!book?.pdfFilename) return null;

  const localPath = path.join(process.cwd(), "assets", book.pdfFilename);
  try {
    const buffer = await readFile(localPath);
    return pdfResponse(new Uint8Array(buffer), filename);
  } catch {
    return null;
  }
}

/** Prefer a 302 to the public Vercel Blob URL — avoids buffering huge PDFs. */
async function getVercelBlobPdfResponse(
  slug: DownloadableSlug
): Promise<NextResponse | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  const blobPath = getPdfBlobPath(slug);
  try {
    const blob = await head(blobPath);
    if (blob.url) {
      return NextResponse.redirect(blob.url, 302);
    }
  } catch {
    // Fall through
  }
  return null;
}

async function getSanityPdfResponse(
  slug: DownloadableSlug,
  filename: string
): Promise<NextResponse | null> {
  const asset = await getProductDownloadAsset(slug);
  if (!asset?.pdfUrl) return null;

  try {
    const response = await fetch(asset.pdfUrl, { cache: "no-store" });
    if (!response.ok || !response.body) return null;

    const contentLength = response.headers.get("content-length");
    return pdfResponse(response.body as BodyInit, asset.pdfFilename ?? filename, {
      ...(contentLength ? { "Content-Length": contentLength } : {}),
    });
  } catch (error) {
    console.error("Sanity PDF proxy failed:", error);
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

  const response =
    (await getSanityPdfResponse(downloadSlug, filename)) ??
    (await getNetlifyBlobPdfResponse(downloadSlug, filename)) ??
    (await getVercelBlobPdfResponse(downloadSlug)) ??
    (await getLocalPdfResponse(downloadSlug, filename));

  if (!response) {
    return NextResponse.json(
      { error: "PDF not found. Contact support." },
      { status: 404 }
    );
  }

  return response;
}

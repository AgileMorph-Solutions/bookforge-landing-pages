import type { NextRequest } from "next/server";

function isLocalhost(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "[::1]"
    );
  } catch {
    return false;
  }
}

function normalizeOrigin(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/** True on hosted builds/deploys where a localhost SITE_URL would be wrong. */
function shouldIgnoreLocalhostEnv(): boolean {
  const context = process.env.CONTEXT;
  if (
    context === "production" ||
    context === "deploy-preview" ||
    context === "branch-deploy"
  ) {
    return true;
  }
  return process.env.NODE_ENV === "production";
}

/** Origin of the incoming request (for Stripe success/cancel URLs). */
export function getRequestOrigin(request: NextRequest): string | null {
  const originHeader = request.headers.get("origin");
  if (originHeader) {
    const origin = normalizeOrigin(originHeader);
    if (origin) return origin;
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
  if (forwardedHost) {
    const host = forwardedHost.split(",")[0]?.trim();
    if (host) {
      const origin = normalizeOrigin(`${forwardedProto}://${host}`);
      if (origin) return origin;
    }
  }

  const host = request.headers.get("host");
  if (host) {
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
      (isLocalhost(`http://${host}`) ? "http" : "https");
    const origin = normalizeOrigin(`${proto}://${host}`);
    if (origin) return origin;
  }

  try {
    return request.nextUrl.origin;
  } catch {
    return null;
  }
}

/**
 * Canonical site URL for Stripe redirects, metadata, sitemap, etc.
 * Prefer request origin when available; then env vars. In production,
 * ignore localhost values so a mis-set NEXT_PUBLIC_SITE_URL cannot
 * send paid users to http://localhost:3000.
 */
export function getSiteUrl(request?: NextRequest): string {
  const ignoreLocalhostEnv = shouldIgnoreLocalhostEnv();

  // Request origin first so Stripe success/cancel match the site the buyer used.
  const requestOrigin = request ? getRequestOrigin(request) : null;
  if (requestOrigin) {
    if (!(ignoreLocalhostEnv && isLocalhost(requestOrigin))) {
      return requestOrigin;
    }
  }

  const envCandidates: Array<string | null | undefined> = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.URL, // Netlify primary site URL
    process.env.DEPLOY_PRIME_URL, // Netlify deploy URL
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ];

  for (const candidate of envCandidates) {
    if (!candidate) continue;
    const origin = normalizeOrigin(candidate);
    if (!origin) continue;
    if (ignoreLocalhostEnv && isLocalhost(origin)) continue;
    return origin;
  }

  return "http://localhost:3000";
}

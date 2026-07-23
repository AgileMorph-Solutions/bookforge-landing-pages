import { createHmac, timingSafeEqual } from "crypto";
import type { DownloadableSlug } from "./entitlements";
import { requireDownloadTokenSecret } from "./env";

export const DOWNLOAD_ACCESS_COOKIE = "download_access";
export const DOWNLOAD_TOKEN_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

export interface DownloadTokenPayload {
  entitledSlugs: DownloadableSlug[];
  sessionId: string;
  exp: number;
}

function toBase64Url(data: string): string {
  return Buffer.from(data, "utf8")
    .toString("base64url");
}

function fromBase64Url(data: string): string {
  return Buffer.from(data, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", requireDownloadTokenSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createDownloadToken(
  entitledSlugs: DownloadableSlug[],
  sessionId: string
): string {
  const payload: DownloadTokenPayload = {
    entitledSlugs,
    sessionId,
    exp: Math.floor(Date.now() / 1000) + DOWNLOAD_TOKEN_MAX_AGE_SECONDS,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyDownloadToken(
  token: string
): DownloadTokenPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signPayload(encodedPayload);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as DownloadTokenPayload;
    if (
      !Array.isArray(payload.entitledSlugs) ||
      typeof payload.sessionId !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function isSlugEntitledInToken(
  token: string,
  slug: DownloadableSlug
): boolean {
  const payload = verifyDownloadToken(token);
  return payload?.entitledSlugs.includes(slug) ?? false;
}

export function getDownloadAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: DOWNLOAD_TOKEN_MAX_AGE_SECONDS,
    path: "/",
  };
}

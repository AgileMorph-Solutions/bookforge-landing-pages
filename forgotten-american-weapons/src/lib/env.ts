export class StripeConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StripeConfigError";
  }
}

export function requireStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith("sk_")) {
    throw new StripeConfigError("STRIPE_SECRET_KEY is missing or invalid");
  }
  return key;
}

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key?.startsWith("sk_"));
}

export function requireWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret?.startsWith("whsec_")) {
    throw new StripeConfigError("STRIPE_WEBHOOK_SECRET is missing or invalid");
  }
  return secret;
}

export function getBlobPdfPrefix(): string {
  return process.env.BLOB_PDF_SECRET_PREFIX ?? "local-dev";
}

export class DownloadTokenConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DownloadTokenConfigError";
  }
}

export function requireDownloadTokenSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new DownloadTokenConfigError(
      "DOWNLOAD_TOKEN_SECRET is missing or too short (min 32 chars)"
    );
  }
  return secret;
}

import { readFileSync } from "fs";
import path from "path";
import { getBlobPdfPrefix } from "./env";
import { INDIVIDUAL_BOOKS, type ProductSlug } from "./products";
import {
  getDownloadableSlugsForProducts,
  getEntitledSlugsForPurchase,
} from "./products.server";

const DEFAULT_FILENAMES: Record<Exclude<ProductSlug, "bundle">, string> = {
  "poor-man-recipe-bible": "poor-man-recipe-bible.pdf",
  "1950s-grandma-cookbook": "1950s-grandma-cookbook.pdf",
  "great-depression-survival": "great-depression-survival.pdf",
  "cowboy-frontier": "cowboy-frontier.pdf",
  "lost-diners-potlucks": "lost-diners-potlucks.pdf",
};

let cachedManifest: Record<string, string> | null | undefined;

function loadBlobManifest(): Record<string, string> | null {
  if (cachedManifest !== undefined) return cachedManifest;

  try {
    const manifestPath = path.join(process.cwd(), "blob-manifest.json");
    const raw = readFileSync(manifestPath, "utf-8");
    cachedManifest = JSON.parse(raw) as Record<string, string>;
  } catch {
    cachedManifest = null;
  }

  return cachedManifest;
}

/** Maps product slugs to Vercel Blob paths. */
export function getPdfBlobPath(
  slug: Exclude<ProductSlug, "bundle">
): string {
  const manifest = loadBlobManifest();
  if (manifest?.[slug]) {
    return manifest[slug];
  }

  const prefix = getBlobPdfPrefix();
  const filename = DEFAULT_FILENAMES[slug];
  return `pdfs/${prefix}/${filename}`;
}

export type DownloadableSlug = Exclude<ProductSlug, "bundle">;

export const DOWNLOADABLE_SLUGS = INDIVIDUAL_BOOKS.map(
  (b) => b.slug as DownloadableSlug
);

export async function getEntitledSlugs(
  purchasedSlug: ProductSlug
): Promise<DownloadableSlug[]> {
  return getEntitledSlugsForPurchase(purchasedSlug);
}

export async function isValidDownloadSlug(slug: string): Promise<boolean> {
  const slugs = await getDownloadableSlugsForProducts();
  return slugs.includes(slug as DownloadableSlug);
}

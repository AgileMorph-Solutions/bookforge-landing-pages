/**
 * carlyfe's Sanity `product` docs were seeded from a different catalogue: their
 * `_id` matches carlyfe/src/lib/products.ts (product.<codeslug>) but
 * `slug.current` / title / price are from an abandoned lineup
 * (buy-once-drive-forever, keep-your-car-forever, ...). carlyfe reads products
 * from Sanity as the source of truth (toProduct variant), so PRODUCT_DOWNLOAD_QUERY
 * and PRODUCTS_QUERY — which key on slug.current — find nothing and every book
 * shows "PDF not available".
 *
 * This patches the 6 docs (5 books + bundle) so slug.current + copy match
 * products.ts. It MERGES (patch.set), so uploaded coverImage assets etc. are
 * preserved. pdfFile:
 *   - 400k-mile / senior-drivers  -> the real books/ PDFs (uploaded earlier)
 *   - bulletproof / under-10k / long-life -> left as-is (no books/ source; the
 *     51-64MB assets already attached are the only candidates)
 *   - bundle -> none; gets includedProducts refs instead
 *
 *   npx tsx scripts/reconcile-carlyfe.ts [--dry-run]
 */
import { createRequire } from "module";
import fs from "fs";
import os from "os";
import path from "path";
import { pathToFileURL } from "url";

const ROOT = path.resolve(__dirname, "..");
const PROJECT_ID = "fgynawmf";
const req = createRequire(path.join(ROOT, "carlyfe/package.json"));
const { createClient } = req("@sanity/client") as typeof import("@sanity/client");

const DRY = process.argv.includes("--dry-run");

function token(): string {
  // carlyfe .env write token first, else the logged-in CLI token.
  for (const n of [".env.local", ".env"]) {
    const p = path.join(ROOT, "carlyfe", n);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*SANITY_API_WRITE_TOKEN\s*=\s*(\S+)/);
      if (m && /^sk[A-Za-z0-9]/.test(m[1])) return m[1].trim();
    }
  }
  return JSON.parse(
    fs.readFileSync(path.join(os.homedir(), ".config/sanity/config.json"), "utf8")
  ).authToken;
}

interface Product {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  price: number;
  compareAt: number;
  coverImage: string;
  pdfFilename: string;
  recipeCount: number;
  highlights: string[];
  era?: string;
  themes: string[];
}

/** slugs whose real PDF lives in books/CARLYFE and was uploaded earlier */
const REAL_PDF_SLUGS = new Set([
  "400k-mile-used-car-buyers-guide",
  "senior-drivers-smart-car-handbook",
]);

async function main() {
  const client = createClient({
    projectId: PROJECT_ID,
    dataset: "production",
    apiVersion: "2026-07-15",
    token: token(),
    useCdn: false,
  });

  const mod = await import(
    pathToFileURL(path.join(ROOT, "carlyfe/src/lib/products.ts")).href
  );
  const books: Product[] = mod.INDIVIDUAL_BOOKS;
  const bundle: Product = mod.BUNDLE;

  const fileRef = (id: string) => ({
    _type: "file" as const,
    asset: { _type: "reference" as const, _ref: id },
  });

  const commonFields = (p: Product, sortOrder: number) => ({
    slug: { _type: "slug" as const, current: p.slug },
    title: p.title,
    shortTitle: p.shortTitle,
    subtitle: p.subtitle,
    price: p.price,
    compareAt: p.compareAt,
    coverImagePath: p.coverImage,
    pdfFilename: p.pdfFilename,
    recipeCount: p.recipeCount,
    era: p.era ?? null,
    themes: p.themes ?? [],
    highlights: p.highlights ?? [],
    sortOrder,
  });

  for (let i = 0; i < books.length; i += 1) {
    const p = books[i];
    const docId = `product.${p.slug}`;
    const set: Record<string, unknown> = {
      ...commonFields(p, i),
      isBundle: false,
      featured: false,
    };

    if (REAL_PDF_SLUGS.has(p.slug)) {
      const asset = await client.fetch<{ _id: string } | null>(
        `*[_type=="sanity.fileAsset" && originalFilename==$fn]|order(size desc)[0]{_id}`,
        { fn: p.pdfFilename }
      );
      if (!asset?._id) throw new Error(`no uploaded asset for ${p.pdfFilename}`);
      set.pdfFile = fileRef(asset._id);
    }

    const before = await client.fetch<{ slug?: string; pdf?: string }>(
      `*[_id==$id][0]{"slug":slug.current,"pdf":pdfFile.asset->originalFilename}`,
      { id: docId }
    );
    console.log(
      `${docId}\n  slug: ${before?.slug} -> ${p.slug}\n  pdf : ${before?.pdf ?? "—"}${set.pdfFile ? ` -> ${p.pdfFilename}` : " (kept)"}`
    );
    if (!DRY) await client.patch(docId).set(set).commit();
  }

  // bundle
  const bundleId = "product.bundle";
  const includedProducts = books.map((p) => ({
    _type: "reference" as const,
    _ref: `product.${p.slug}`,
    _key: p.slug,
  }));
  const bundleSet = {
    ...commonFields(bundle, books.length),
    isBundle: true,
    featured: true,
    includedProducts,
  };
  const bBefore = await client.fetch<{ slug?: string }>(
    `*[_id==$id][0]{"slug":slug.current}`,
    { id: bundleId }
  );
  console.log(`${bundleId}\n  slug: ${bBefore?.slug} -> bundle\n  includedProducts: ${includedProducts.map((r) => r._key).join(", ")}`);
  if (!DRY) await client.patch(bundleId).set(bundleSet).commit();

  console.log(DRY ? "\n[dry run — nothing written]" : "\ncarlyfe reconciled.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.stack : e);
  process.exit(1);
});

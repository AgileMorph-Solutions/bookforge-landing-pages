/**
 * forgotten-ways-to-make-money: the 5 product docs / slugs / titles were an
 * invented catalogue ("Thrift-to-Wealth Habits", "Ledger & Cashflow Guide", …)
 * that matched neither the cover art nor the PDFs. This migrates every doc to
 * the real books, keyed to the (correct) cover art:
 *
 *   product.forgotten-side-hustle-playbook -> product.forgotten-side-hustles
 *   product.thrift-to-wealth-habits        -> product.zero-start-business-playbook
 *   product.old-trade-income-manual        -> product.junk-to-cash-reselling-guide
 *   product.ledger-and-cashflow-guide      -> product.boring-businesses-blueprint
 *   product.ingenuity-income-handbook      -> product.over-50-side-hustle-handbook
 *
 * Creates the new docs (metadata from the updated products.ts, cover asset ref
 * copied from the old doc, correct PDF uploaded from books/), repoints the
 * bundle, rewrites homePage.recipePreviews + a few copy fields, then deletes the
 * old docs + their now-orphaned shuffled PDF assets.
 *
 *   npx tsx scripts/rebrand-forgotten-ways.ts [--dry-run]
 */
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { pathToFileURL } from "url";

const ROOT = path.resolve(__dirname, "..");
const SITE = "forgotten-ways-to-make-money";
const PROJECT_ID = "2zvm6n87";
const BOOKS = path.join(ROOT, "books", "Forgotten Ways to Make Money");
const DRY = process.argv.includes("--dry-run");

const req = createRequire(path.join(ROOT, SITE, "package.json"));
const { createClient } = req("@sanity/client") as typeof import("@sanity/client");

function writeToken(): string {
  for (const n of [".env.local", ".env"]) {
    const p = path.join(ROOT, SITE, n);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*SANITY_API_WRITE_TOKEN\s*=\s*(\S+)/);
      if (m && /^sk[A-Za-z0-9]/.test(m[1])) return m[1].trim();
    }
  }
  throw new Error("no SANITY_API_WRITE_TOKEN");
}

interface Book {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  price: number;
  compareAt: number;
  coverImage: string;
  pdfFilename: string;
  recipeCount: number;
  era?: string;
  themes: string[];
  highlights: string[];
}

/** old doc _id  ->  { newSlug, booksHint, previews } */
const MIGRATION: Record<
  string,
  { newSlug: string; hint: string; previewEra: string; previewDetail: string }
> = {
  "product.forgotten-side-hustle-playbook": {
    newSlug: "forgotten-side-hustles",
    hint: "100-forgotten-side-hustles",
    previewEra: "Local Income",
    previewDetail: "Weekend Services",
  },
  "product.thrift-to-wealth-habits": {
    newSlug: "zero-start-business-playbook",
    hint: "the-0-start-business-playbook",
    previewEra: "Service Business",
    previewDetail: "Validate & Sell",
  },
  "product.old-trade-income-manual": {
    newSlug: "junk-to-cash-reselling-guide",
    hint: "the-junk-to-cash-reselling-guide",
    previewEra: "Reselling",
    previewDetail: "Flip for Profit",
  },
  "product.ledger-and-cashflow-guide": {
    newSlug: "boring-businesses-blueprint",
    hint: "the-boring-businesses-blueprint",
    previewEra: "Repeat Revenue",
    previewDetail: "Recurring Clients",
  },
  "product.ingenuity-income-handbook": {
    newSlug: "over-50-side-hustle-handbook",
    hint: "the-over-50-side-hustle-handbook",
    previewEra: "Flexible Income",
    previewDetail: "Part-Time Work",
  },
};

const norm = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[\s_\-–—]+/g, "");

function resolveBook(hint: string): string {
  const h = norm(hint);
  const matches = readdirSync(BOOKS)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .filter((f) => norm(f).includes(h));
  if (!matches.length) throw new Error(`no books/ PDF for "${hint}"`);
  matches.sort(
    (a, b) => statSync(path.join(BOOKS, b)).size - statSync(path.join(BOOKS, a)).size
  );
  return path.join(BOOKS, matches[0]);
}

function fileRef(id: string) {
  return { _type: "file" as const, asset: { _type: "reference" as const, _ref: id } };
}

async function main() {
  const client = createClient({
    projectId: PROJECT_ID,
    dataset: "production",
    apiVersion: "2026-07-15",
    token: writeToken(),
    useCdn: false,
    perspective: "raw",
  });

  const mod = await import(
    pathToFileURL(path.join(ROOT, SITE, "src/lib/products.ts")).href
  );
  const books: Book[] = mod.INDIVIDUAL_BOOKS;
  const bundle: Book = mod.BUNDLE;
  const bookBySlug = new Map(books.map((b) => [b.slug, b]));

  console.log(`${DRY ? "[dry-run] " : ""}rebranding ${SITE}\n`);

  const oldIds = Object.keys(MIGRATION);
  const oldDocs = await client.fetch<
    { _id: string; coverRef?: string }[]
  >(`*[_id in $ids]{ _id, "coverRef": coverImage.asset._ref }`, { ids: oldIds });
  const coverRefById = new Map(oldDocs.map((d) => [d._id, d.coverRef]));

  // 1. create new product docs
  const newIdBySlug = new Map<string, string>();
  for (const [oldId, m] of Object.entries(MIGRATION)) {
    const book = bookBySlug.get(m.newSlug);
    if (!book) throw new Error(`products.ts missing slug ${m.newSlug}`);
    const newId = `product.${m.newSlug}`;
    newIdBySlug.set(m.newSlug, newId);

    const source = resolveBook(m.hint);
    const size = statSync(source).size;

    let assetId = "dry-run-asset";
    if (!DRY) {
      const asset = await client.assets.upload("file", createReadStream(source), {
        filename: book.pdfFilename,
        contentType: "application/pdf",
      });
      assetId = asset._id;
    }
    console.log(
      `  ${oldId}\n    -> ${newId}  "${book.title}"\n    PDF ${path.basename(source)} (${(size / 1e6).toFixed(1)}MB)`
    );

    const coverRef = coverRefById.get(oldId);
    const doc: Record<string, unknown> = {
      _id: newId,
      _type: "product",
      title: book.title,
      shortTitle: book.shortTitle,
      slug: { _type: "slug", current: m.newSlug },
      subtitle: book.subtitle,
      price: book.price,
      compareAt: book.compareAt,
      coverImagePath: book.coverImage,
      pdfFilename: book.pdfFilename,
      pdfFile: fileRef(assetId),
      recipeCount: book.recipeCount,
      era: book.era ?? null,
      themes: book.themes,
      highlights: book.highlights,
      featured: false,
      isBundle: false,
      sortOrder: books.indexOf(book),
    };
    if (coverRef) {
      doc.coverImage = { _type: "image", asset: { _type: "reference", _ref: coverRef } };
    }
    if (!DRY) await client.createOrReplace(doc as never);
  }

  // 2. bundle: subtitle + includedProducts
  const includedProducts = books.map((b) => ({
    _type: "reference" as const,
    _ref: newIdBySlug.get(b.slug)!,
    _key: b.slug,
  }));
  console.log(`\n  product.bundle -> includedProducts: ${books.map((b) => b.slug).join(", ")}`);
  if (!DRY) {
    await client
      .patch("product.bundle")
      .set({ subtitle: bundle.subtitle, includedProducts, isBundle: true })
      .commit();
  }

  // 3. homePage: recipePreviews + copy
  const hp = await client.fetch<{
    _id: string;
    items: { _key: string; image?: unknown }[];
  }>(`*[_type=="homePage"][0]{ _id, "items": recipePreviews.items[]{ _key, image } }`);

  const previewOrder = [
    "forgotten-side-hustles",
    "zero-start-business-playbook",
    "junk-to-cash-reselling-guide",
    "boring-businesses-blueprint",
  ];
  const newItems = previewOrder.map((slug, i) => {
    const b = bookBySlug.get(slug)!;
    const m = Object.values(MIGRATION).find((x) => x.newSlug === slug)!;
    return {
      _key: hp.items?.[i]?._key ?? slug,
      name: b.shortTitle,
      era: m.previewEra,
      detail: m.previewDetail,
      bookSlug: slug,
      imagePath: b.coverImage,
      ...(hp.items?.[i]?.image ? { image: hp.items[i].image } : {}),
    };
  });
  console.log(`\n  homePage.recipePreviews.items -> ${previewOrder.join(", ")}`);
  if (!DRY) {
    await client
      .patch(hp._id)
      .set({
        "recipePreviews.items": newItems,
        "hero.subheadline":
          "Five guides, five hundred lessons — weekend side-hustles, $0-start service businesses, reselling, repeat-customer services, and flexible part-time income. Built from the same research behind Forgotten Ways to Make Money.",
        "library.body":
          "Weekend side-hustles, $0-start service businesses, reselling, repeat-customer services, and flexible part-time work — every guide built for real households that need cash, not course hype.",
        "whatsInside.body":
          "Five hundred lessons across five guides. Each volume carries checklists, worksheets, step-by-step income plays, and the practical detail that rarely made a modern guru's funnel.",
      })
      .commit();
  }

  // 4. delete old docs (published + drafts) and their orphaned shuffled PDFs
  const oldPdfNames = [
    "forgotten-side-hustle-playbook.pdf",
    "thrift-to-wealth-habits.pdf",
    "old-trade-income-manual.pdf",
    "ledger-and-cashflow-guide.pdf",
    "ingenuity-income-handbook.pdf",
  ];
  console.log(`\n  delete old docs: ${oldIds.join(", ")}`);
  if (!DRY) {
    for (const id of oldIds) {
      await client.delete(id).catch(() => {});
      await client.delete(`drafts.${id}`).catch(() => {});
    }
    const orphans = await client.fetch<{ _id: string; originalFilename: string }[]>(
      `*[_type=="sanity.fileAsset" && originalFilename in $names && count(*[references(^._id)])==0]{ _id, originalFilename }`,
      { names: oldPdfNames }
    );
    for (const o of orphans) {
      await client.delete(o._id).catch(() => {});
      console.log(`  deleted orphan asset ${o.originalFilename}`);
    }
  }

  console.log(DRY ? "\n[dry-run complete]" : "\nforgotten-ways-to-make-money rebranded.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.stack : e);
  process.exit(1);
});

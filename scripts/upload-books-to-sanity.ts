/**
 * Upload every book PDF from repo-root books/ into its site's Sanity project and
 * attach it to the matching `product` document.
 *
 *   npx tsx scripts/upload-books-to-sanity.ts            # all sites
 *   npx tsx scripts/upload-books-to-sanity.ts british-nostalgia carlyfe
 *   npx tsx scripts/upload-books-to-sanity.ts --dry-run
 *
 * Auth: uses SANITY_AUTH_TOKEN if set, otherwise the token from the logged-in
 * Sanity CLI (~/.config/sanity/config.json). That account is admin on every
 * project, so one token covers them all.
 *
 * Idempotent: a file asset already present with the same originalFilename AND
 * byte size is reused; product docs are patched, not duplicated. Corrupt/old
 * assets left unreferenced afterwards are deleted unless --keep-orphans.
 */
import { execFileSync } from "child_process";
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from "fs";
import { createRequire } from "module";
import os from "os";
import path from "path";
import { pathToFileURL } from "url";

const ROOT = path.resolve(__dirname, "..");
const BOOKS = path.join(ROOT, "books");
const API_VERSION = "2026-07-15";
const DATASET = "production";

const siteRequire = createRequire(
  path.join(ROOT, "lost-american-memories", "package.json")
);
const { createClient } = siteRequire("@sanity/client") as typeof import("@sanity/client");
type SanityClient = ReturnType<typeof createClient>;

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const KEEP_ORPHANS = args.includes("--keep-orphans");
const siteFilter = args.filter((a) => !a.startsWith("--"));

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

/** slug -> distinctive substring of the source filename in books/<folder>/ */
type BookHints = Record<string, string>;

interface SiteSpec {
  site: string;
  projectId: string;
  booksFolder: string;
  hints: BookHints;
}

const SITES: SiteSpec[] = [
  {
    site: "american-food-history",
    projectId: "iji68mld",
    booksFolder: "American Food History",
    hints: {
      "1776-american-table": "the-1776-american-table",
      "great-american-supper-club-cookbook": "the-great-american-supper-club",
      "lost-american-steakhouse-cookbook": "the-lost-american-steakhouse",
      "outlaws-pirates-soldiers-cookbook": "the-outlaws-pirates-soldiers",
      "route-66-roadside-cookbook": "the-route-66-roadside",
    },
  },
  {
    site: "british-nostalgia",
    projectId: "n5gutrbv",
    booksFolder: "British Nostalgia",
    hints: {
      "british-pensioner-egg-potato-cookbook": "the-british-pensioner-s-egg-potato",
      "tinned-food-tea-time-bible": "the-tinned-food-tea-time-bible",
      "five-minute-british-suppers": "the-5-minute-british-suppers",
      "one-person-batch-cooking-plan": "the-one-person-british-batch-cooking",
      "nans-pension-kitchen": "nan-s-pension-kitchen",
    },
  },
  {
    site: "carlyfe",
    projectId: "fgynawmf",
    booksFolder: "CARLYFE",
    hints: {
      "400k-mile-used-car-buyers-guide": "the-400-000-mile-used-car",
      "senior-drivers-smart-car-handbook": "the_senior_drivers_smart_car_handbook",
    },
  },
  {
    site: "forgotten-american-skills",
    projectId: "lp0hbjba",
    booksFolder: "Forgotten American Skills",
    hints: {
      "old-timer-skills-handbook": "the-old-timer-skills-handbook",
      "vanishing-trades-starter-guide": "the-vanishing-trades-starter-guide",
      "hand-tool-home-repair-bible": "the-hand-tool-home-repair-bible",
      "traditional-food-preservation-guide": "the-traditional-food-preservation-guide",
      "frontier-camping-manual": "the-frontier-camping-manual",
    },
  },
  {
    site: "forgotten-american-survival",
    projectId: "ksy60hww",
    booksFolder: "Forgotten American Survival",
    hints: {
      "7-day-blackout-survival-plan": "the 7-day blackout survival plan",
      "forgotten-shelter-warmth-manual": "the forgotten shelter",
      "poor-mans-emergency-stockpile": "the poor man",
      "grandparents-home-security-handbook": "home security handbook",
      "off-grid-water-food-preservation": "the off-grid water",
    },
  },
  {
    site: "forgotten-american-weapons",
    projectId: "1gz3wplt",
    booksFolder: "Forgotten American Weapons",
    hints: {
      "hidden-weapons-1920s": "hidden-weapons-of-the-1920s",
      "mountain-man-frontier-arms": "the-mountain-man-frontier-arms",
      "forgotten-american-farm-guns": "forgotten-american-farm-guns",
      "american-weapons-identification-handbook": "the-american-weapons-identification-handbook",
      "responsible-collectors-storage-safety": "the-responsible-collector-s-storage-safety",
    },
  },
  {
    site: "forgotten-ways-to-make-money",
    projectId: "2zvm6n87",
    booksFolder: "Forgotten Ways to Make Money",
    hints: {
      "forgotten-side-hustle-playbook": "100-forgotten-side-hustles",
      "ingenuity-income-handbook": "the-junk-to-cash-reselling-guide",
      "old-trade-income-manual": "the-boring-businesses-blueprint",
      "ledger-and-cashflow-guide": "the-0-start-business-playbook",
      "thrift-to-wealth-habits": "the-over-50-side-hustle-handbook",
    },
  },
  {
    site: "kuche-von-fruher",
    projectId: "jnkwlwnc",
    booksFolder: "Kuche von Fruher",
    hints: {
      "omas-arme-leute-kueche": "omas arme-leute",
      "vergessene-gaststaetten-klassiker": "vergessene deutsche gaststätten",
      "omas-sonntagstafel": "omas vergessene sonntagstafel",
    },
  },
  {
    site: "lost-american-memories",
    projectId: "pu1kusrz",
    booksFolder: "Lost American Memories",
    hints: {
      "poor-man-recipe-bible": "the-poor-man-recipe-bible-fixed",
      "1950s-grandma-cookbook": "the-1950s-grandma-cookbook-fixed",
      "great-depression-survival": "the-great-depression-survival-cookbook",
      "cowboy-frontier": "the-cowboy-frontier-working-man-cookbook",
      "lost-diners-potlucks": "the-lost-diners-potlucks-american-memories",
    },
  },
  {
    site: "once-upon-a-british-time",
    projectId: "mh7aketu",
    booksFolder: "Once Upon A British Time",
    hints: {
      "british-grocery-lasting-bible": "the-british-freezer-bible",
    },
  },
  {
    site: "stop-wasting-stuff",
    projectId: "x0a4syb1",
    booksFolder: "Stop wasting stuff",
    hints: {
      "hydrogen-peroxide-homeowner-bible": "the hydrogen peroxide homeowner bible",
      "baking-soda-vinegar-salt-manual": "the baking soda, vinegar & salt",
      "cheap-pest-proof-home": "the cheap pest-proof home",
      "stop-throwing-it-away": "stop throwing it away",
      "five-dollar-home-maintenance": "the $5 home maintenance handbook",
    },
  },
];

function cliToken(): string {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN.trim();
  const cfgPath = path.join(os.homedir(), ".config", "sanity", "config.json");
  const token = JSON.parse(readFileSync(cfgPath, "utf8")).authToken as string | undefined;
  if (!token) {
    throw new Error(
      "No Sanity token. Set SANITY_AUTH_TOKEN or run `npx sanity login`."
    );
  }
  return token;
}

/** Projects the logged-in CLI user is NOT a member of — use the site's own token. */
const SITE_TOKEN_ONLY = new Set([
  "forgotten-ways-to-make-money",
  "once-upon-a-british-time",
]);

function siteEnvWriteToken(site: string): string | null {
  for (const name of [".env.local", ".env"]) {
    const envPath = path.join(ROOT, site, name);
    if (!existsSync(envPath)) continue;
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*SANITY_API_WRITE_TOKEN\s*=\s*(\S+)/);
      if (m && /^sk[A-Za-z0-9]/.test(m[1])) return m[1].trim();
    }
  }
  return null;
}

/** The CLI admin token works for every project except a couple; those carry
 *  their own Editor token in .env. */
function tokenForSite(site: string, cliTok: string): string {
  if (SITE_TOKEN_ONLY.has(site)) {
    const t = siteEnvWriteToken(site);
    if (!t) throw new Error(`${site}: no SANITY_API_WRITE_TOKEN in .env`);
    return t;
  }
  return cliTok;
}

const norm = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[\s_\-–—]+/g, "");

function resolveSource(folder: string, hint: string): string | null {
  const dir = path.join(BOOKS, folder);
  if (!existsSync(dir)) return null;
  const h = norm(hint);
  const pdfs = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const matches = pdfs.filter((f) => norm(f).includes(h));
  if (matches.length === 0) return null;
  matches.sort(
    (a, b) => statSync(path.join(dir, b)).size - statSync(path.join(dir, a)).size
  );
  return path.join(dir, matches[0]);
}

function isValidPdf(file: string): { ok: boolean; pages?: number; reason?: string } {
  const head = readFileSync(file, { encoding: "latin1", flag: "r" }).slice(0, 5);
  if (head !== "%PDF-") return { ok: false, reason: "no %PDF- header" };
  try {
    const out = execFileSync("pdfinfo", [file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    if (/Syntax Error/i.test(out)) return { ok: false, reason: "pdfinfo syntax error" };
    const pages = Number(out.match(/^Pages:\s+(\d+)/m)?.[1]);
    return { ok: true, pages };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { ok: false, reason: `pdfinfo failed: ${msg}` };
  }
}

async function loadProducts(site: string): Promise<Product[]> {
  const mod = await import(
    pathToFileURL(path.join(ROOT, site, "src/lib/products.ts")).href
  );
  return mod.INDIVIDUAL_BOOKS as Product[];
}

function fileRef(assetId: string) {
  return {
    _type: "file" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

interface Stats {
  uploaded: number;
  reused: number;
  docsCreated: number;
  docsPatched: number;
  orphansDeleted: number;
  skipped: string[];
}

async function processSite(spec: SiteSpec, cliTok: string, stats: Stats) {
  const token = tokenForSite(spec.site, cliTok);
  const client = createClient({
    projectId: spec.projectId,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token,
    useCdn: false,
    perspective: "raw",
  });

  const products = await loadProducts(spec.site);
  console.log(`\n=== ${spec.site} (${spec.projectId}) ===`);

  const touchedFilenames = new Set<string>();

  for (const [slug, hint] of Object.entries(spec.hints)) {
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      console.warn(`  ! ${slug}: not in products.ts — skip`);
      stats.skipped.push(`${spec.site}/${slug} (no product)`);
      continue;
    }
    const pdfFilename = product.pdfFilename || `${slug}.pdf`;

    const source = resolveSource(spec.booksFolder, hint);
    if (!source) {
      console.warn(`  ! ${slug}: no source file for "${hint}" — skip`);
      stats.skipped.push(`${spec.site}/${slug} (no source)`);
      continue;
    }

    touchedFilenames.add(pdfFilename);
    const size = statSync(source).size;
    const valid = isValidPdf(source);
    if (!valid.ok) {
      console.warn(`  ! ${slug}: ${path.basename(source)} invalid (${valid.reason}) — skip`);
      stats.skipped.push(`${spec.site}/${slug} (invalid pdf)`);
      continue;
    }

    // Reuse an asset already in the project with identical bytes — matched by
    // filename first, else by exact byte size (same PDF uploaded under a hash
    // name by an earlier migration).
    const candidates = await client.fetch<{ _id: string; size: number; originalFilename: string }[]>(
      `*[_type == "sanity.fileAsset" && mimeType == "application/pdf" && (originalFilename == $fn || size == $size)]{ _id, size, originalFilename }`,
      { fn: pdfFilename, size }
    );
    let assetId =
      candidates.find((a) => a.originalFilename === pdfFilename && a.size === size)?._id ??
      candidates.find((a) => a.size === size)?._id;

    if (assetId) {
      const reused = candidates.find((a) => a._id === assetId)!;
      const note = reused.originalFilename === pdfFilename ? "" : ` (as ${reused.originalFilename})`;
      console.log(
        `  = ${slug}: reuse asset${note} (${(size / 1e6).toFixed(1)}MB, ${valid.pages}p)`
      );
      stats.reused += 1;
    } else if (DRY_RUN) {
      console.log(
        `  + ${slug}: WOULD upload ${path.basename(source)} (${(size / 1e6).toFixed(1)}MB, ${valid.pages}p)`
      );
      assetId = "dry-run";
      stats.uploaded += 1;
    } else {
      const asset = await client.assets.upload(
        "file",
        createReadStream(source),
        { filename: pdfFilename, contentType: "application/pdf" }
      );
      assetId = asset._id;
      console.log(
        `  + ${slug}: uploaded ${path.basename(source)} (${(size / 1e6).toFixed(1)}MB, ${valid.pages}p)`
      );
      stats.uploaded += 1;
    }
    // Upsert product.<slug>
    const docId = `product.${slug}`;
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_id == $id && _type == "product"][0]{ _id }`,
      { id: docId }
    );

    if (DRY_RUN) {
      console.log(`     ${doc ? "would patch" : "would create"} ${docId}`);
      if (doc) stats.docsPatched += 1;
      else stats.docsCreated += 1;
      continue;
    }

    if (doc?._id) {
      await client
        .patch(docId)
        .set({ pdfFilename, pdfFile: fileRef(assetId) })
        .commit();
      console.log(`     patched ${docId}`);
      stats.docsPatched += 1;
    } else {
      await client.create({
        _id: docId,
        _type: "product",
        title: product.title,
        shortTitle: product.shortTitle,
        slug: { _type: "slug", current: slug },
        subtitle: product.subtitle,
        price: product.price,
        compareAt: product.compareAt,
        coverImagePath: product.coverImage,
        pdfFilename,
        pdfFile: fileRef(assetId),
        recipeCount: product.recipeCount,
        era: product.era,
        themes: product.themes ?? [],
        highlights: product.highlights ?? [],
        featured: false,
        isBundle: false,
        sortOrder: products.indexOf(product),
      });
      console.log(`     created ${docId}`);
      stats.docsCreated += 1;
    }
  }

  // Delete the now-unreferenced predecessors of the PDFs we just (re)uploaded —
  // e.g. the truncated 1.8MB versions. Scoped to filenames we touched, so
  // unrelated assets in the project are left alone.
  if (!KEEP_ORPHANS && !DRY_RUN && touchedFilenames.size) {
    const orphans = await client.fetch<{ _id: string; originalFilename: string; size: number }[]>(
      `*[_type == "sanity.fileAsset" && mimeType == "application/pdf" && originalFilename in $names && count(*[references(^._id)]) == 0]{ _id, originalFilename, size }`,
      { names: [...touchedFilenames] }
    );
    for (const o of orphans) {
      try {
        await client.delete(o._id);
        console.log(
          `  - deleted orphan asset ${o.originalFilename} (${(o.size / 1e6).toFixed(1)}MB)`
        );
        stats.orphansDeleted += 1;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`  ! could not delete orphan ${o._id}: ${msg}`);
      }
    }
  }
}

async function main() {
  const token = cliToken();
  const targets = siteFilter.length
    ? SITES.filter((s) => siteFilter.includes(s.site))
    : SITES;

  if (targets.length === 0) {
    console.error(`No matching sites. Known: ${SITES.map((s) => s.site).join(", ")}`);
    process.exit(1);
  }

  console.log(
    `${DRY_RUN ? "[DRY RUN] " : ""}Uploading books for ${targets.length} site(s)...`
  );

  const stats: Stats = {
    uploaded: 0,
    reused: 0,
    docsCreated: 0,
    docsPatched: 0,
    orphansDeleted: 0,
    skipped: [],
  };

  for (const spec of targets) {
    try {
      await processSite(spec, token, stats);
    } catch (error) {
      console.error(
        `\n!! ${spec.site} failed:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log("\n──────── summary ────────");
  console.log(`assets uploaded : ${stats.uploaded}`);
  console.log(`assets reused   : ${stats.reused}`);
  console.log(`product created : ${stats.docsCreated}`);
  console.log(`product patched : ${stats.docsPatched}`);
  console.log(`orphans deleted : ${stats.orphansDeleted}`);
  if (stats.skipped.length) {
    console.log(`skipped         :`);
    for (const s of stats.skipped) console.log(`  - ${s}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
});

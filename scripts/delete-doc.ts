/**
 * Delete one or more documents by _id from a site's Sanity dataset.
 * Usage: SANITY_API_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... \
 *        npx tsx scripts/delete-doc.ts <site-slug> <docId> [docId...]
 */
import { createRequire } from "module";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const [siteSlug, ...docIds] = process.argv.slice(2);

if (!siteSlug || docIds.length === 0) {
  console.error("Usage: npx tsx scripts/delete-doc.ts <site-slug> <docId> [docId...]");
  process.exit(1);
}

const siteRequire = createRequire(path.join(ROOT, siteSlug, "package.json"));
const { createClient } = siteRequire("@sanity/client") as typeof import("@sanity/client");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const tx = client.transaction();
  for (const id of docIds) tx.delete(id);
  await tx.commit();
  console.log(`Deleted: ${docIds.join(", ")}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

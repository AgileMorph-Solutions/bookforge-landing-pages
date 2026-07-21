/**
 * Delete Sanity product docs whose slugs are not in the local LAM catalog.
 * Run: npx sanity exec scripts/cleanup-orphan-products.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { ALL_PRODUCTS } from "../src/lib/products";
import { apiVersion } from "../src/sanity/env";

const client = getCliClient({ apiVersion });
const keep = new Set(ALL_PRODUCTS.map((p) => p.slug));

async function main() {
  const products = await client.fetch<
    { _id: string; slug?: string; title?: string }[]
  >(`*[_type == "product"]{ _id, "slug": slug.current, title }`);

  const orphans = products.filter((p) => !p.slug || !keep.has(p.slug as never));
  console.log(
    "Orphans to delete:",
    orphans.map((p) => p.slug ?? p._id)
  );

  if (!orphans.length) {
    console.log("No orphan products.");
    return;
  }

  const tx = client.transaction();
  for (const product of orphans) {
    tx.delete(product._id);
  }
  await tx.commit();
  console.log(`Deleted ${orphans.length} orphan products.`);

  const remaining = await client.fetch(
    `*[_type == "product"]|order(sortOrder asc){ title, "slug": slug.current, price }`
  );
  console.log("Remaining products:", JSON.stringify(remaining, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

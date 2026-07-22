/**
 * Upload PDFs from <site>/assets/ to Sanity and patch product documents.
 * Usage: npx tsx scripts/upload-pdf-assets-to-sanity.ts <site-slug>
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in site .env or environment.
 */
import { createReadStream, existsSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { pathToFileURL } from "url";

const ROOT = path.resolve(__dirname, "..");
const siteSlug = process.argv[2];

if (!siteSlug) {
  console.error("Usage: npx tsx scripts/upload-pdf-assets-to-sanity.ts <site-slug>");
  process.exit(1);
}

const siteDir = path.join(ROOT, siteSlug);
const assetsDir = path.join(siteDir, "assets");
const siteRequire = createRequire(path.join(siteDir, "package.json"));
const { createClient } = siteRequire("@sanity/client") as typeof import("@sanity/client");
type SanityClient = ReturnType<typeof createClient>;

type Product = {
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
};

function getClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-15";
  const token =
    process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN;

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
  }
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is required (create an Editor token in sanity.io/manage)"
    );
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

function fileRef(assetId: string) {
  return {
    _type: "file" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

async function findAssetId(
  client: SanityClient,
  filename: string
): Promise<string | null> {
  return client.fetch<string | null>(
    `*[_type == "sanity.fileAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );
}

async function uploadPdf(
  client: SanityClient,
  filePath: string,
  filename: string
): Promise<string> {
  const existingId = await findAssetId(client, filename);
  if (existingId) {
    console.log(`    reusing asset ${filename}`);
    return existingId;
  }

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const asset = await client.assets.upload("file", createReadStream(filePath), {
        filename,
        contentType: "application/pdf",
      });
      console.log(`    uploaded ${filename}`);
      return asset._id;
    } catch (error) {
      if (attempt === 3) throw error;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`    retry ${filename}: ${message}`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }

  throw new Error(`Unable to upload ${filename}`);
}

async function main() {
  const productsModule = await import(
    pathToFileURL(path.join(siteDir, "src/lib/products.ts")).href
  );
  const books: Product[] = productsModule.INDIVIDUAL_BOOKS;
  const client = getClient();

  console.log(`Uploading PDFs for ${siteSlug} (project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID})`);

  const transaction = client.transaction();

  for (const product of books) {
    if (!product.pdfFilename) continue;

    const pdfPath = path.join(assetsDir, product.pdfFilename);
    if (!existsSync(pdfPath)) {
      console.warn(`  ✗ missing ${product.pdfFilename} — skip ${product.slug}`);
      continue;
    }

    const pdfAssetId = await uploadPdf(client, pdfPath, product.pdfFilename);
    const docId = `product.${product.slug}`;

    // Patch only PDF fields so existing covers/copy are preserved.
    const existing = await client.fetch<{ _id?: string } | null>(
      `*[_id == $id][0]{ _id }`,
      { id: docId }
    );

    if (existing?._id) {
      transaction.patch(docId, {
        set: {
          pdfFilename: product.pdfFilename,
          pdfFile: fileRef(pdfAssetId),
        },
      });
    } else {
      transaction.create({
        _id: docId,
        _type: "product",
        title: product.title,
        shortTitle: product.shortTitle,
        slug: { _type: "slug", current: product.slug },
        subtitle: product.subtitle,
        price: product.price,
        compareAt: product.compareAt,
        coverImagePath: product.coverImage,
        pdfFilename: product.pdfFilename,
        pdfFile: fileRef(pdfAssetId),
        recipeCount: product.recipeCount,
        era: product.era,
        themes: product.themes,
        highlights: product.highlights,
        featured: false,
        isBundle: false,
        sortOrder: books.indexOf(product),
      });
    }

    console.log(`  ✓ product.${product.slug}`);
  }

  await transaction.commit();
  console.log("PDF upload complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

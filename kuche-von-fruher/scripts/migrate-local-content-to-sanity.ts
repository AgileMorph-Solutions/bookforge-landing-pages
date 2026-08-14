import { createReadStream, statSync } from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { costComparison, recipePreviews } from "../src/data/copy";
import { faqItems } from "../src/data/faq";
import { testimonials } from "../src/data/testimonials";
import { fallbackHomePage, fallbackSiteSettings } from "../src/lib/site-content";
import { ALL_PRODUCTS, INDIVIDUAL_BOOKS } from "../src/lib/products";
import { apiVersion, dataset, projectId } from "../src/sanity/env";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;
const client = writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    })
  : getCliClient({ apiVersion });
const root = process.cwd();

// Sanity asset uploads are capped well under these PDFs' size (147-190MB); skip
// the upload and let the download API's local-file fallback serve them instead.
const MAX_UPLOADABLE_PDF_BYTES = 95 * 1024 * 1024;

const coverFiles: Record<string, string> = {
  "omas-arme-leute-kueche": "omas-arme-leute-kueche.png",
  "vergessene-gaststaetten-klassiker": "vergessene-gaststaetten-klassiker.png",
  "omas-sonntagstafel": "omas-sonntagstafel.png",
  bundle: "bundle.png",
};

const recipeImageFiles: Record<string, string> = {
  "Pantry Stew": "pantry-stew.png",
  "Sunday Roast": "sunday-roast.png",
  "Trail Skillet Beans": "trail-skillet-beans.png",
  "Fellowship Hall Pudding": "fellowship-hall-pudding.png",
};

function fileRef(assetId: string) {
  return {
    _type: "file",
    asset: { _type: "reference", _ref: assetId },
  };
}

function imageRef(assetId: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

async function findAssetId(type: "image" | "file", filename: string) {
  const assetType = type === "image" ? "sanity.imageAsset" : "sanity.fileAsset";
  return client.fetch<string | null>(
    `*[_type == $assetType && originalFilename == $filename][0]._id`,
    { assetType, filename }
  );
}

async function uploadAsset(
  type: "image" | "file",
  filePath: string,
  options?: { force?: boolean }
) {
  const filename = path.basename(filePath);
  if (!options?.force) {
    const existingId = await findAssetId(type, filename);
    if (existingId) return existingId;
  }

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const asset = await client.assets.upload(type, createReadStream(filePath), {
        filename,
        contentType: type === "file" ? "application/pdf" : undefined,
      });
      return asset._id;
    } catch (error) {
      if (attempt === 3) throw error;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Retrying ${filename} upload after error: ${message}`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }

  throw new Error(`Unable to upload ${filename}`);
}

async function uploadCover(slug: string) {
  const filename = coverFiles[slug];
  if (!filename) return null;
  return uploadAsset("image", path.join(root, "public", "images", "covers", filename), { force: true });
}

async function uploadRecipeImage(name: string) {
  const filename = recipeImageFiles[name];
  if (!filename) return null;
  return uploadAsset("image", path.join(root, "public", "images", "recipes", filename));
}

async function uploadLogo() {
  return uploadAsset("image", path.join(root, "public", "images", "logo.png"), { force: true });
}

async function migrateSettings() {
  const logoId = await uploadLogo();
  const ogImageId = await uploadCover("bundle");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSiteSettings,
    logo: imageRef(logoId),
    ogImage: ogImageId ? imageRef(ogImageId) : undefined,
  });
}

async function migrateProducts() {
  const productDocs = [];

  for (const [index, product] of ALL_PRODUCTS.entries()) {
    const coverId = await uploadCover(product.slug);
    let pdfId: string | null = null;
    if (product.pdfFilename) {
      const pdfPath = path.join(root, "assets", product.pdfFilename);
      const { size } = statSync(pdfPath);
      if (size > MAX_UPLOADABLE_PDF_BYTES) {
        console.warn(
          `Skipping Sanity upload for ${product.pdfFilename} (${(size / 1024 / 1024).toFixed(0)}MB exceeds asset upload limit); will serve from local assets/ fallback.`
        );
      } else {
        pdfId = await uploadAsset("file", pdfPath);
      }
    }

    productDocs.push({
      _id: `product.${product.slug}`,
      _type: "product",
      title: product.title,
      shortTitle: product.shortTitle,
      slug: { _type: "slug", current: product.slug },
      subtitle: product.subtitle,
      price: product.price,
      compareAt: product.compareAt,
      coverImage: coverId ? imageRef(coverId) : undefined,
      coverImagePath: product.coverImage,
      pdfFilename: product.pdfFilename,
      pdfFile: pdfId ? fileRef(pdfId) : undefined,
      recipeCount: product.recipeCount,
      era: product.era,
      themes: product.themes,
      highlights: product.highlights,
      featured: product.slug === "bundle",
      isBundle: product.slug === "bundle",
      includedProducts:
        product.slug === "bundle"
          ? INDIVIDUAL_BOOKS.map((book) => ({
              _type: "reference",
              _ref: `product.${book.slug}`,
              _key: book.slug,
            }))
          : undefined,
      sortOrder: index,
    });
  }

  const individuals = productDocs.filter((product) => product.slug.current !== "bundle");
  const bundle = productDocs.find((product) => product.slug.current === "bundle");

  const individualTransaction = client.transaction();
  for (const product of individuals) {
    individualTransaction.createOrReplace(product);
  }
  await individualTransaction.commit();

  if (bundle) {
    await client.createOrReplace(bundle);
  }
}

async function migrateHomePage() {
  const recipeItems = [];

  for (const preview of recipePreviews) {
    const imageId = await uploadRecipeImage(preview.name);
    recipeItems.push({
      ...preview,
      image: imageId ? imageRef(imageId) : undefined,
      imagePath: preview.image,
    });
  }

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    ...fallbackHomePage,
    costComparison: {
      ...fallbackHomePage.costComparison,
      modern: costComparison.modern,
      vintage: costComparison.vintage,
    },
    recipePreviews: {
      ...fallbackHomePage.recipePreviews,
      items: recipeItems,
    },
    testimonials: {
      ...fallbackHomePage.testimonials,
      items: testimonials,
    },
    faq: {
      ...fallbackHomePage.faq,
      items: faqItems,
    },
  });
}

async function main() {
  console.log("Migrating local content to Sanity...");
  await migrateSettings();
  await migrateProducts();
  await migrateHomePage();
  console.log("Sanity migration complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});


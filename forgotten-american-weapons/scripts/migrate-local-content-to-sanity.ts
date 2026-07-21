import { createReadStream, existsSync } from "fs";
import path from "path";
import { getCliClient } from "sanity/cli";
import { costComparison, recipePreviews, siteConfig } from "../src/data/copy";
import { faqItems } from "../src/data/faq";
import { testimonials } from "../src/data/testimonials";
import { fallbackHomePage, fallbackSiteSettings } from "../src/lib/site-content";
import { ALL_PRODUCTS, INDIVIDUAL_BOOKS } from "../src/lib/products";
import { apiVersion } from "../src/sanity/env";

const client = getCliClient({ apiVersion });
const root = process.cwd();

const coverFiles: Record<string, string> = {
  "hidden-weapons-1920s": "hidden-weapons-1920s.png",
  "mountain-man-frontier-arms": "mountain-man-frontier-arms.png",
  "forgotten-american-farm-guns": "forgotten-american-farm-guns.png",
  "american-weapons-identification-handbook": "american-weapons-identification-handbook.png",
  "responsible-collectors-storage-safety": "responsible-collectors-storage-safety.png",
  bundle: "bundle.png",
};

async function uploadRecipeImage(imagePath: string) {
  const filePath = path.join(root, "public", imagePath.replace(/^\//, ""));
  if (!existsSync(filePath)) return null;
  return uploadAsset("image", filePath, { force: true });
}

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
    const pdfPath = path.join(root, "assets", product.pdfFilename);
    const pdfId =
      product.pdfFilename && existsSync(pdfPath)
        ? await uploadAsset("file", pdfPath)
        : null;

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
    const imageId = await uploadRecipeImage(preview.image);
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
    youtube: {
      ...fallbackHomePage.youtube,
      stats: [
        { value: siteConfig.youtubeSubscribers, label: "Subscribers" },
        { value: "50M+", label: "Views" },
        { value: "Expert", label: "Research" },
      ],
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


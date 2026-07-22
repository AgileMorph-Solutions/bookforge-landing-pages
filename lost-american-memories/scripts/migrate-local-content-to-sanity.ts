import { createReadStream } from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { costComparison, recipePreviews, siteConfig } from "../src/data/copy";
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

const coverFiles: Record<string, string> = {
  "poor-man-recipe-bible": "poor man recipe bible cover.png",
  "1950s-grandma-cookbook": "1950s grandma cookbook cover.png",
  "great-depression-survival": "great depression survival cookbook cover.png",
  "cowboy-frontier": "cowboy frontier working man cookbook cover.png",
  "lost-diners-potlucks": "lost diners potlucks american memories.png",
  bundle: "bundle cover.png",
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

async function uploadAsset(type: "image" | "file", filePath: string) {
  const filename = path.basename(filePath);
  const existingId = await findAssetId(type, filename);
  if (existingId) return existingId;

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
  return uploadAsset("image", path.join(root, "assets", filename));
}

async function uploadRecipeImage(name: string) {
  const filename = recipeImageFiles[name];
  if (!filename) return null;
  return uploadAsset("image", path.join(root, "public", "images", "recipes", filename));
}

async function uploadLogo() {
  return uploadAsset("image", path.join(root, "public", "images", "logo.png"));
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
    const pdfId = product.pdfFilename
      ? await uploadAsset("file", path.join(root, "assets", product.pdfFilename))
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

  const transaction = client.transaction();
  for (const product of productDocs) {
    transaction.createOrReplace(product);
  }
  await transaction.commit();
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
    youtube: {
      ...fallbackHomePage.youtube,
      stats: [
        { value: siteConfig.youtubeSubscribers, label: "Subscribers" },
        { value: "50M+", label: "Views" },
        { value: "1932–85", label: "Sourced from" },
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


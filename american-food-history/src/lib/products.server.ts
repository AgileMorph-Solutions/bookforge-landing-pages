import { access } from "fs/promises";
import path from "path";
import {
  ALL_PRODUCTS,
  BUNDLE,
  INDIVIDUAL_BOOKS,
  type Product,
  type ProductSlug,
} from "@/lib/products";
import { isSanityEnabled } from "@/lib/cms";
import { client } from "@/sanity/lib/client";
import {
  PRODUCT_DOWNLOAD_QUERY,
  PRODUCTS_PDF_AVAILABILITY_QUERY,
  PRODUCTS_QUERY,
} from "@/sanity/lib/queries";

type SanityProduct = {
  slug?: string;
  title?: string;
  shortTitle?: string;
  subtitle?: string;
  price?: number;
  compareAt?: number;
  coverImage?: string;
  pdfFilename?: string;
  recipeCount?: number;
  era?: string;
  themes?: string[];
  highlights?: string[];
  sortOrder?: number;
};

const productSlugs = new Set<ProductSlug>(
  ALL_PRODUCTS.map((product) => product.slug)
);

function isProductSlug(slug: string | undefined): slug is ProductSlug {
  return Boolean(slug && productSlugs.has(slug as ProductSlug));
}

function toProduct(sanityProduct: SanityProduct): Product {
  if (!isProductSlug(sanityProduct.slug)) {
    throw new Error(`Unknown Sanity product slug: ${sanityProduct.slug}`);
  }

  return {
    slug: sanityProduct.slug,
    title: sanityProduct.title ?? "",
    shortTitle: sanityProduct.shortTitle ?? "",
    subtitle: sanityProduct.subtitle ?? "",
    price: sanityProduct.price ?? 0,
    compareAt: sanityProduct.compareAt ?? 0,
    coverImage: sanityProduct.coverImage ?? "",
    pdfFilename: sanityProduct.pdfFilename ?? "",
    recipeCount: sanityProduct.recipeCount ?? 0,
    era: sanityProduct.era,
    themes: sanityProduct.themes ?? [],
    highlights: sanityProduct.highlights ?? [],
  };
}

async function getSanityProducts(): Promise<Product[]> {
  const products = await client.fetch<SanityProduct[]>(
    PRODUCTS_QUERY,
    {},
    { cache: "no-store" }
  );

  return products
    .filter((product) => isProductSlug(product.slug))
    .map(toProduct);
}

export async function getProductsForLanding(): Promise<{
  individualBooks: Product[];
  bundle: Product;
}> {
  if (!isSanityEnabled()) {
    console.log("[Products] Sanity disabled, using local products");
    return {
      individualBooks: INDIVIDUAL_BOOKS,
      bundle: BUNDLE,
    };
  }

  try {
    const products = await getSanityProducts();
    console.log(`[Products] Fetched ${products.length} products from Sanity`);

    const bundle = products.find((product) => product.slug === "bundle");
    const individualBooks = products.filter((product) => product.slug !== "bundle");

    console.log(`[Products] Found bundle: ${!!bundle}, individual books: ${individualBooks.length}`);

    if (!bundle) {
      console.error("[Products] Sanity bundle product is missing. Available slugs:", products.map(p => p.slug).join(", "));
      throw new Error("Sanity bundle product is missing.");
    }
    if (individualBooks.length === 0) {
      console.error("[Products] Sanity has no individual products");
      throw new Error("Sanity individual products are missing.");
    }

    console.log("[Products] Successfully loaded products from Sanity");
    return { individualBooks, bundle };
  } catch (error) {
    console.warn(
      "[Products] Unable to fetch Sanity products; using local product data.",
      error instanceof Error ? error.message : error
    );
    return {
      individualBooks: INDIVIDUAL_BOOKS,
      bundle: BUNDLE,
    };
  }
}

export async function getAllProductsForCommerce(): Promise<Product[]> {
  const { individualBooks, bundle } = await getProductsForLanding();
  return [...individualBooks, bundle];
}

export async function getProductBySlugForCheckout(
  slug: string
): Promise<Product | undefined> {
  if (!isProductSlug(slug)) return undefined;

  const products = await getAllProductsForCommerce();
  return products.find((product) => product.slug === slug);
}

export async function getDownloadableSlugsForProducts(): Promise<
  Exclude<ProductSlug, "bundle">[]
> {
  const { individualBooks } = await getProductsForLanding();
  return individualBooks.map(
    (product) => product.slug as Exclude<ProductSlug, "bundle">
  );
}

export async function getEntitledSlugsForPurchase(
  purchasedSlug: ProductSlug
): Promise<Exclude<ProductSlug, "bundle">[]> {
  if (purchasedSlug === "bundle") {
    return getDownloadableSlugsForProducts();
  }

  return [purchasedSlug as Exclude<ProductSlug, "bundle">];
}

export interface ProductDownloadAsset {
  title?: string;
  pdfFilename?: string;
  pdfUrl?: string;
  pdfAssetId?: string;
}

export async function getProductDownloadAsset(
  slug: string
): Promise<ProductDownloadAsset | null> {
  if (!isProductSlug(slug) || slug === "bundle") return null;
  if (!isSanityEnabled()) return null;

  try {
    return await client.fetch<ProductDownloadAsset | null>(
      PRODUCT_DOWNLOAD_QUERY,
      { slug },
      { cache: "no-store" }
    );
  } catch (error) {
    console.warn("Unable to fetch Sanity PDF asset.", error);
    return null;
  }
}

async function localPdfExists(
  slug: Exclude<ProductSlug, "bundle">
): Promise<boolean> {
  const book = INDIVIDUAL_BOOKS.find((item) => item.slug === slug);
  if (!book?.pdfFilename) return false;

  try {
    await access(path.join(process.cwd(), "assets", book.pdfFilename));
    return true;
  } catch {
    return false;
  }
}

export async function isPdfAvailableForSlug(
  slug: Exclude<ProductSlug, "bundle">
): Promise<boolean> {
  if (isSanityEnabled()) {
    try {
      const rows = await client.fetch<{ slug?: string; hasPdf?: boolean }[]>(
        PRODUCTS_PDF_AVAILABILITY_QUERY,
        {},
        { cache: "no-store" }
      );
      const row = rows.find((item) => item.slug === slug);
      if (row?.hasPdf) return true;
    } catch (error) {
      console.warn(
        "Unable to check Sanity PDF availability; falling back to local.",
        error
      );
    }
  }

  return localPdfExists(slug);
}

export async function validatePdfsAvailableForPurchase(
  slug: ProductSlug
): Promise<{ ok: boolean; missingTitles: string[] }> {
  const entitled = await getEntitledSlugsForPurchase(slug);
  const missingTitles: string[] = [];

  for (const bookSlug of entitled) {
    if (!(await isPdfAvailableForSlug(bookSlug))) {
      const book = INDIVIDUAL_BOOKS.find((item) => item.slug === bookSlug);
      missingTitles.push(book?.shortTitle ?? book?.title ?? bookSlug);
    }
  }

  return { ok: missingTitles.length === 0, missingTitles };
}

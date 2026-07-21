import {
  ALL_PRODUCTS,
  BUNDLE,
  INDIVIDUAL_BOOKS,
  type Product,
  type ProductSlug,
} from "@/lib/products";
import { isSanityEnabled } from "@/lib/cms";
import { client } from "@/sanity/lib/client";
import { PRODUCT_DOWNLOAD_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";

type SanityProduct = Partial<Omit<Product, "slug">> & {
  slug?: string;
  isBundle?: boolean;
  includedProductSlugs?: string[];
};

const productSlugs = new Set<ProductSlug>(
  ALL_PRODUCTS.map((product) => product.slug)
);

function isProductSlug(slug: string | undefined): slug is ProductSlug {
  return Boolean(slug && productSlugs.has(slug as ProductSlug));
}

function mergeStringArray(
  value: unknown,
  fallback: string[]
): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function mergeProduct(base: Product, sanityProduct?: SanityProduct): Product {
  if (!sanityProduct) return base;

  return {
    ...base,
    title: sanityProduct.title ?? base.title,
    shortTitle: sanityProduct.shortTitle ?? base.shortTitle,
    subtitle: sanityProduct.subtitle ?? base.subtitle,
    price: sanityProduct.price ?? base.price,
    compareAt: sanityProduct.compareAt ?? base.compareAt,
    coverImage: sanityProduct.coverImage ?? base.coverImage,
    pdfFilename: sanityProduct.pdfFilename ?? base.pdfFilename,
    recipeCount: sanityProduct.recipeCount ?? base.recipeCount,
    era: sanityProduct.era ?? base.era,
    themes: mergeStringArray(sanityProduct.themes, base.themes),
    highlights: mergeStringArray(sanityProduct.highlights, base.highlights),
  };
}

async function getSanityProducts(): Promise<Map<ProductSlug, SanityProduct>> {
  if (!isSanityEnabled()) return new Map();
  try {
    const products = await client.fetch<SanityProduct[]>(
      PRODUCTS_QUERY,
      {},
      { cache: "no-store" }
    );

    return new Map(
      products
        .filter((product) => isProductSlug(product.slug))
        .map((product) => [product.slug as ProductSlug, product])
    );
  } catch (error) {
    console.warn(
      "Unable to fetch Sanity products; using local product data.",
      error
    );
    return new Map();
  }
}

export async function getProductsForLanding(): Promise<{
  individualBooks: Product[];
  bundle: Product;
}> {
  const sanityProducts = await getSanityProducts();

  return {
    individualBooks: INDIVIDUAL_BOOKS.map((product) =>
      mergeProduct(product, sanityProducts.get(product.slug))
    ),
    bundle: mergeProduct(BUNDLE, sanityProducts.get(BUNDLE.slug)),
  };
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
  return individualBooks.map((product) => product.slug as Exclude<ProductSlug, "bundle">);
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
    console.warn("Unable to fetch Sanity PDF asset; using local fallback.", error);
    return null;
  }
}


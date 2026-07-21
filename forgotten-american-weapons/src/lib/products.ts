export type ProductSlug =
  | "hidden-weapons-1920s"
  | "mountain-man-frontier-arms"
  | "forgotten-american-farm-guns"
  | "american-weapons-identification-handbook"
  | "responsible-collectors-storage-safety"
  | "bundle";

export interface Product {
  slug: ProductSlug;
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

export const CHECKOUT_CURRENCY = "usd" as "usd" | "gbp";

export const INDIVIDUAL_BOOKS: Product[] = [
  {
    slug: "hidden-weapons-1920s",
    title: "Hidden Weapons of the 1920s",
    shortTitle: "1920s Weapons Guide",
    subtitle: "A Museum-Style Guide to Gangster-Era Arms, Tools & History",
    price: 19,
    compareAt: 39,
    coverImage: "/images/covers/hidden-weapons-1920s.png",
    pdfFilename: "hidden-weapons-1920s.pdf",
    recipeCount: 100,
    era: "1920s",
    themes: ["Gangster Era","Prohibition","Museum"],
    highlights: ["Gangster-era arms with historical context","Museum-style documentation and photos","Prohibition-era tools and equipment","Primary-source research throughout","Collector-grade reference material"],
  },
  {
    slug: "mountain-man-frontier-arms",
    title: "The Mountain Man & Frontier Arms Encyclopedia",
    shortTitle: "Frontier Arms Encyclopedia",
    subtitle: "Equipment, Provenance and Historical Context",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/mountain-man-frontier-arms.png",
    pdfFilename: "mountain-man-frontier-arms.pdf",
    recipeCount: 100,
    era: "Frontier",
    themes: ["Frontier","Mountain Men","Encyclopedia"],
    highlights: ["Frontier-era arms and equipment","Provenance and historical context","Mountain man and trapper gear","Encyclopedia-style reference","Primary-source documentation"],
  },
  {
    slug: "forgotten-american-farm-guns",
    title: "Forgotten American Farm Guns",
    shortTitle: "Farm Guns Guide",
    subtitle: "A Collector's Guide to Shotguns, Rifles & Working-Farm History",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/forgotten-american-farm-guns.png",
    pdfFilename: "forgotten-american-farm-guns.pdf",
    recipeCount: 100,
    era: "Farm",
    themes: ["Farm Guns","Shotguns","Working History"],
    highlights: ["Shotguns and rifles from working farms","Collector's identification guide","Working-farm history and context","Models that defined rural America","Preservation and documentation tips"],
  },
  {
    slug: "american-weapons-identification-handbook",
    title: "The American Weapons Identification Handbook",
    shortTitle: "Identification Handbook",
    subtitle: "Markings, Eras, Provenance, Documentation & Preservation",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/american-weapons-identification-handbook.png",
    pdfFilename: "american-weapons-identification-handbook.pdf",
    recipeCount: 100,
    era: "Reference",
    themes: ["Identification","Markings","Preservation"],
    highlights: ["Markings and manufacturer identification","Era dating and provenance research","Documentation best practices","Preservation without damage","Reference tables and checklists"],
  },
  {
    slug: "responsible-collectors-storage-safety",
    title: "The Responsible Collector's Storage & Safety Manual",
    shortTitle: "Storage & Safety Manual",
    subtitle: "Secure Storage, Transport, Maintenance & Legal Research",
    price: 27,
    compareAt: 49,
    coverImage: "/images/covers/responsible-collectors-storage-safety.png",
    pdfFilename: "responsible-collectors-storage-safety.pdf",
    recipeCount: 100,
    era: "Safety",
    themes: ["Storage","Safety","Legal"],
    highlights: ["Secure storage methods and products","Safe transport guidelines","Maintenance without damage","Legal research resources by state","Responsible collector checklist"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "The Forgotten American Weapons Historical Archive",
  shortTitle: "Complete Library",
  subtitle: "All 5 collector and history guides in one complete archive — gangster era, frontier, farm guns, identification, and safe storage",
  price: 59,
  compareAt: 175,
  coverImage: "/images/covers/bundle.png",
  pdfFilename: "",
  recipeCount: 500,
  themes: ["Complete Collection", "Best Value"],
  highlights: [
    "All five guides in one purchase",
    "Instant PDF download on any device",
    "Share with family members freely",
    "First Edition pricing — best value",
    "Lifetime access to your download",
  ],
};

export const ALL_PRODUCTS: Product[] = [...INDIVIDUAL_BOOKS, BUNDLE];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return CHECKOUT_CURRENCY === "gbp" ? `£${amount}` : `$${amount}`;
}

export function getBundleValueStack(
  products: Product[] = INDIVIDUAL_BOOKS
): { label: string; value: number }[] {
  return [
    ...products.map((b) => ({
      label: b.shortTitle,
      value: b.compareAt,
    })),
    { label: "Family Sharing License", value: 19 },
    { label: "First Edition Lifetime Updates", value: 21 },
  ];
}

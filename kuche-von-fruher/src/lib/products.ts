export type ProductSlug =
  | "omas-arme-leute-kueche"
  | "vergessene-gaststaetten-klassiker"
  | "omas-sonntagstafel"
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

export const CHECKOUT_CURRENCY = "eur" as "usd" | "gbp" | "eur";

export const INDIVIDUAL_BOOKS: Product[] = [
  {
    slug: "omas-arme-leute-kueche",
    title: "Omas Arme-Leute-Küche",
    shortTitle: "Arme-Leute-Küche",
    subtitle: "60 vergessene Rezepte, die eine ganze Familie für fast nichts satt machten",
    price: 24.99,
    compareAt: 34.99,
    coverImage: "/images/covers/omas-arme-leute-kueche.png",
    pdfFilename: "omas-arme-leute-kueche.pdf",
    recipeCount: 100,
    era: "Nachkriegszeit",
    themes: ["Sparsam kochen","Hausmannskost","Kartoffeln"],
    highlights: ["60 vergessene Familienrezepte","Günstige Zutaten aus jeder Küche","Traditionelle Eintöpfe und Aufläufe","Für die ganze Familie gedacht","Deutsche Küche aus armen Zeiten"],
  },
  {
    slug: "vergessene-gaststaetten-klassiker",
    title: "Vergessene deutsche Gaststätten-Klassiker",
    shortTitle: "Gaststätten-Klassiker",
    subtitle: "50 beliebte Gerichte aus alten Gaststätten, Metzgereien, Bäckereien und Kantinen",
    price: 24.99,
    compareAt: 34.99,
    coverImage: "/images/covers/vergessene-gaststaetten-klassiker.png",
    pdfFilename: "vergessene-gaststaetten-klassiker.pdf",
    recipeCount: 100,
    era: "Gasthaus-Tradition",
    themes: ["Schnitzel & Braten","Gaststätten-Klassiker","Deftige Küche"],
    highlights: ["50 Rezepte aus alten Gaststätten","Klassiker von Metzgerei bis Bäckerei","Kantinen-Gerichte neu entdeckt","Deftige Braten, Soßen und Beilagen","Authentische Gasthaus-Tradition"],
  },
  {
    slug: "omas-sonntagstafel",
    title: "Omas vergessene Sonntagstafel",
    shortTitle: "Sonntagstafel",
    subtitle: "50 deutsche Sonntagsessen, Festtagskuchen und Familienrezepte aus den 1950er- bis 1970er-Jahren",
    price: 24.99,
    compareAt: 34.99,
    coverImage: "/images/covers/omas-sonntagstafel.png",
    pdfFilename: "omas-sonntagstafel.pdf",
    recipeCount: 100,
    era: "1950er–1970er",
    themes: ["Sonntagsbraten","Festtagskuchen","Familientradition"],
    highlights: ["50 Sonntags- und Festtagsrezepte","Aus den 1950er- bis 1970er-Jahren","Braten, Kuchen und Nachspeisen","Familienrezepte über Generationen","Für besondere Anlässe am Tisch"],
  },
];

export const BUNDLE: Product = {
  slug: "bundle",
  title: "Das nostalgische Kochbuch-Bundle",
  shortTitle: "Komplettpaket",
  subtitle: "3 Kochbücher voller deutscher Klassiker — von Omas Arme-Leute-Küche bis zur Sonntagstafel",
  price: 49.99,
  compareAt: 104.97,
  coverImage: "/images/covers/bundle.png",
  pdfFilename: "",
  recipeCount: 300,
  themes: ["Komplettsammlung","Bestes Preis-Leistungs-Verhältnis"],
  highlights: ["Alle drei Kochbücher in einem Kauf","Sofortiger PDF-Download auf jedem Gerät","Frei mit der Familie teilbar","Bundle-Preis — bester Wert","Lebenslanger Zugriff auf Ihren Download"],
};

export const ALL_PRODUCTS: Product[] = [...INDIVIDUAL_BOOKS, BUNDLE];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  if (CHECKOUT_CURRENCY === "eur") {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
  }
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
    { label: "Familienlizenz", value: 17 },
    { label: "Lebenslange Updates zur Erstausgabe", value: 19 },
  ];
}

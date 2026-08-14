export const siteConfig = {
  name: "Küche von Früher",
  tagline: "Ein Archiv deutscher Familienrezepte",
  youtubeUrl: "https://www.youtube.com",
  youtubeSubscribers: "—",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "Rezepte",
  successDownloadLabel: "Laden Sie Ihre Kochbücher unten herunter.",
};

export const heroCopy = {
  headline: "Die Gerichte, die Deutschland vergessen hat. Neu gekocht für Ihre Küche.",
  subheadline: "Drei Kochbücher voller deutscher Klassiker — von Omas Arme-Leute-Küche bis zur Sonntagstafel. Hundertfünfzig Rezepte, recherchiert und für heutige Küchen aufbereitet.",
  primaryCta: "Zur Bibliothek",
  secondaryCta: "Sammlung ansehen",
};

export const costComparison = {
  modern: [{"label":"Restaurantbesuch (zwei Personen)","cost":"35–60 €"},{"label":"Lieferdienst-Bestellung","cost":"15–25 €"},{"label":"Fertiggericht aus dem Kühlregal","cost":"4–7 €"},{"label":"Gedrucktes Kochbuch (ein Thema)","cost":"20–30 €"},{"label":"Eine Woche auswärts essen","cost":"120 €+"}],
  vintage: [{"label":"Teller aus Omas Arme-Leute-Küche","cost":"~1,50 €"},{"label":"Sonntagsbraten aus dem Buch","cost":"~4 €"},{"label":"Gaststätten-Klassiker zu Hause","cost":"~3 €"},{"label":"Wocheneinkauf für alle drei Bücher","cost":"~25 €"},{"label":"Komplettes Bundle, einmalig","cost":"49,99 €"}],
};

export const recipePreviews = [
  {
    "name": "Arme-Leute-Küche",
    "era": "Nachkriegszeit",
    "detail": "Sparsam kochen",
    bookSlug: "omas-arme-leute-kueche" as const,
    "image": "/images/covers/omas-arme-leute-kueche.png"
  },
  {
    "name": "Gaststätten-Klassiker",
    "era": "Gasthaus-Tradition",
    "detail": "Schnitzel & Braten",
    bookSlug: "vergessene-gaststaetten-klassiker" as const,
    "image": "/images/covers/vergessene-gaststaetten-klassiker.png"
  },
  {
    "name": "Sonntagstafel",
    "era": "1950er–1970er",
    "detail": "Sonntagsbraten",
    bookSlug: "omas-sonntagstafel" as const,
    "image": "/images/covers/omas-sonntagstafel.png"
  }
];

export const youtubeSection = {
  headline: "Basierend auf echter Recherche. Keine recycelten Listicles.",
  body: "Küche von Früher sammelt die deutschen Familienrezepte, die sonst in Kladden und Rezeptkarten verschwunden wären. Dieses Archiv bringt sie in Ordnung — praktisch, druckbar und bereit für Ihre nächste Mahlzeit.",
};

export const guaranteeCopy = {
  headline: "Das Erster-Teller-Versprechen",
  body: "Sie haben einen vollen Monat Zeit. Testen Sie die Kochbücher. Falls sie sich nicht auszahlen — eine E-Mail genügt für die volle Rückerstattung. Alle Bücher behalten Sie trotzdem. Keine Rücksendung. Kein Kleingedrucktes.",
};

export const orderCopy = {
  headline: "Einmal 49,99 € zahlen. Für immer deutsche Klassiker kochen.",
  subheadline: "Ihr Download-Link kommt innerhalb einer Minute per E-Mail. Öffnen Sie ihn auf jedem Gerät oder drucken Sie die Rezepte aus.",
  individualNote: "Nur ein Buch gewünscht? Einzelbücher starten bei 24,99 €. Alle drei einzeln zu kaufen summiert sich auf 74,97 € — deshalb greifen die meisten zum Komplettset für 49,99 €.",
};

export const lastCallCopy = {
  headline: "Drei Kochbücher deutscher Geschichte. Eine Sammlung.",
  body: "49,99 € für alle drei Kochbücher. Testen Sie sie diesen Monat — falls sie sich nicht lohnen, erhalten Sie per E-Mail eine volle Rückerstattung.",
};

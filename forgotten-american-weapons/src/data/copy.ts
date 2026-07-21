export const siteConfig = {
  name: "Forgotten American Weapons",
  tagline: "A Historical Arms Archive",
  youtubeUrl: "https://www.youtube.com/channel/UC5vH3Goef09AUi6sZKtbBng",
  youtubeSubscribers: "12K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "entries",
  successDownloadLabel: "Download your guides below.",
};

export const heroCopy = {
  headline: "The arms America forgot. Documented the way museums do it.",
  subheadline: "Five guides spanning gangster-era arms to frontier encyclopedias — historical weapons research, identification, and responsible collector practices. Built from primary sources, not gun-show gossip.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [{"label":"Single collector reference book","cost":"$45–$80"},{"label":"Appraisal consultation","cost":"$150–$300"},{"label":"Museum exhibition catalogue","cost":"$35–$60"},{"label":"Gun show misidentification cost","cost":"Priceless"},{"label":"Improper storage damage","cost":"$500+"}],
  vintage: [{"label":"Identification before you buy","cost":"Avoid costly mistakes"},{"label":"Proper storage setup","cost":"~$50"},{"label":"Documentation template pack","cost":"Included"},{"label":"Legal research checklist","cost":"Included"},{"label":"Full archive reference","cost":"$59"}],
};

export const recipePreviews = [
  {
    "name": "1920s Weapons Guide",
    "era": "1920s",
    "detail": "Gangster Era",
    bookSlug: "hidden-weapons-1920s" as const,
    "image": "/images/covers/hidden-weapons-1920s.png"
  },
  {
    "name": "Frontier Arms Encyclopedia",
    "era": "Frontier",
    "detail": "Frontier",
    bookSlug: "mountain-man-frontier-arms" as const,
    "image": "/images/covers/mountain-man-frontier-arms.png"
  },
  {
    "name": "Farm Guns Guide",
    "era": "Farm",
    "detail": "Farm Guns",
    bookSlug: "forgotten-american-farm-guns" as const,
    "image": "/images/covers/forgotten-american-farm-guns.png"
  },
  {
    "name": "Identification Handbook",
    "era": "Reference",
    "detail": "Identification",
    bookSlug: "american-weapons-identification-handbook" as const,
    "image": "/images/covers/american-weapons-identification-handbook.png"
  }
];

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: "Forgotten American Weapons preserves the historical arms and equipment that shaped American frontier and farm life. This archive puts that research in order — museum-style documentation for collectors and history enthusiasts.",
};

export const guaranteeCopy = {
  headline: "The 30-Day Promise",
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: "Pay $59 once. Reference forever.",
  subheadline: "Your download link lands in email within about a minute. Open on any device or print the identification tables.",
  individualNote:
    "Want only one volume? Singles start at $19. Buying all five alone adds up to $127 — which is why most people take the full set at $59.",
};

export const lastCallCopy = {
  headline: "One misidentified purchase costs more than this entire archive.",
  body: "$59 covers all five guides. Use them on your next research project; if they never earn their keep, one email gets a full refund.",
};

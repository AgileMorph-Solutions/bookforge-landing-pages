export const siteConfig = {
  name: "Forgotten American Survival",
  tagline: "An Emergency Preparedness Library",
  youtubeUrl: "https://www.youtube.com/@ForgottenAmericanSurvival",
  youtubeSubscribers: "60.3K",
  averageRating: "4.9",
  readerCount: "4,820+",
  guaranteeDays: 30,
  firstEditionSpotsLeft: 180,
  bundlePriceEndAt: 5000,
  contentUnitLabel: "lessons",
  successDownloadLabel: "Download your manuals below.",
};

export const heroCopy = {
  headline: "The skills your grandparents knew. Written down before they're gone.",
  subheadline: "Five manuals. Five hundred preparedness lessons from American frontier families — blackout plans, shelter, stockpiles, security, and water. Every guide built on primary-source research and tested for modern households.",
  primaryCta: "Get the Library",
  secondaryCta: "Browse the collection",
};

export const costComparison = {
  modern: [{"label":"Commercial emergency kit (family)","cost":"$200–$400"},{"label":"Home security system install","cost":"$500–$1,500"},{"label":"Generator + fuel (week)","cost":"$150–$300"},{"label":"Bottled water (month, family)","cost":"$80–$120"},{"label":"Professional prep consultant","cost":"$300+"}],
  vintage: [{"label":"7-day blackout pantry plan","cost":"~$40"},{"label":"DIY shelter insulation","cost":"~$15"},{"label":"Rotating stockpile (month 1)","cost":"~$25"},{"label":"Security lighting upgrade","cost":"~$20"},{"label":"Water storage + purification","cost":"~$30"}],
};

export const recipePreviews = [
  {
    "name": "7-Day Blackout Plan",
    "era": "Emergency",
    "detail": "Blackout",
    bookSlug: "7-day-blackout-survival-plan" as const,
    "image": "/images/covers/7-day-blackout-survival-plan.png"
  },
  {
    "name": "Shelter & Warmth Manual",
    "era": "Shelter",
    "detail": "Shelter",
    bookSlug: "forgotten-shelter-warmth-manual" as const,
    "image": "/images/covers/forgotten-shelter-warmth-manual.png"
  },
  {
    "name": "Emergency Stockpile",
    "era": "Stockpile",
    "detail": "Supplies",
    bookSlug: "poor-mans-emergency-stockpile" as const,
    "image": "/images/covers/poor-mans-emergency-stockpile.png"
  },
  {
    "name": "Home Security Handbook",
    "era": "Security",
    "detail": "Security",
    bookSlug: "grandparents-home-security-handbook" as const,
    "image": "/images/covers/grandparents-home-security-handbook.png"
  }
];

export const youtubeSection = {
  headline: "Built from real research. Not recycled listicles.",
  body: "Forgotten American Survival preserves the ingenuity and self-reliance of frontier families. This library puts those lessons in order — step by step, printable, and ready before you need them.",
};

export const guaranteeCopy = {
  headline: "The 30-Day Promise",
  body: "You get a full month. Try the guides. If they never earn their keep — one email gets a full refund. Keep every book. No returns. No fine print.",
};

export const orderCopy = {
  headline: "Pay $59 once. Be ready forever.",
  subheadline: "Your download link lands in email within about a minute. Print the checklists. Keep them where your family can find them.",
  individualNote:
    "Want only one volume? Singles start at $19. Buying all five alone adds up to $127 — which is why most people take the full set at $59.",
};

export const lastCallCopy = {
  headline: "Don't wait for the next blackout to start preparing.",
  body: "$59 covers all five manuals. Try them this month; if they never earn their keep, one email gets a full refund — and you still keep the set.",
};

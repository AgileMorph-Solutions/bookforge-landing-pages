import {
  fallbackHomePage,
  fallbackSiteSettings,
  type HomePageContent,
  type SiteSettingsContent,
} from "@/lib/site-content";
import { isSanityEnabled } from "@/lib/cms";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

function mergeDefined<T extends object>(
  fallback: T,
  value: Partial<T> | null | undefined
): T {
  if (!value) return fallback;

  const entries = Object.entries(value as Record<string, unknown>).filter(([, entryValue]) => {
    if (entryValue === undefined || entryValue === null) return false;
    if (Array.isArray(entryValue) && entryValue.length === 0) return false;
    return true;
  });

  return { ...fallback, ...Object.fromEntries(entries) } as T;
}

function mergeHomePage(
  value: Partial<HomePageContent> | null | undefined
): HomePageContent {
  if (!value) return fallbackHomePage;

  return {
    ...fallbackHomePage,
    ...value,
    countdownBanner: mergeDefined(
      fallbackHomePage.countdownBanner,
      value.countdownBanner
    ),
    navigation: {
      links: value.navigation?.links?.length
        ? value.navigation.links
        : fallbackHomePage.navigation.links,
    },
    hero: mergeDefined(fallbackHomePage.hero, value.hero),
    library: mergeDefined(fallbackHomePage.library, value.library),
    costComparison: mergeDefined(
      fallbackHomePage.costComparison,
      value.costComparison
    ),
    whatsInside: mergeDefined(fallbackHomePage.whatsInside, value.whatsInside),
    recipePreviews: {
      headline:
        value.recipePreviews?.headline ?? fallbackHomePage.recipePreviews.headline,
      items: value.recipePreviews?.items?.length
        ? value.recipePreviews.items
        : fallbackHomePage.recipePreviews.items,
    },
    testimonials: {
      ...mergeDefined(fallbackHomePage.testimonials, value.testimonials),
      items: value.testimonials?.items?.length
        ? value.testimonials.items
        : fallbackHomePage.testimonials.items,
    },
    youtube: {
      ...mergeDefined(fallbackHomePage.youtube, value.youtube),
      stats: value.youtube?.stats?.length
        ? value.youtube.stats
        : fallbackHomePage.youtube.stats,
    },
    guarantee: mergeDefined(fallbackHomePage.guarantee, value.guarantee),
    order: mergeDefined(fallbackHomePage.order, value.order),
    faq: {
      ...mergeDefined(fallbackHomePage.faq, value.faq),
      items: value.faq?.items?.length ? value.faq.items : fallbackHomePage.faq.items,
    },
    lastCall: mergeDefined(fallbackHomePage.lastCall, value.lastCall),
    footer: mergeDefined(fallbackHomePage.footer, value.footer),
  };
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  if (!isSanityEnabled()) return fallbackSiteSettings;
  try {
    const settings = await client.fetch<Partial<SiteSettingsContent> | null>(
      SITE_SETTINGS_QUERY,
      {},
      { cache: "no-store" }
    );
    return mergeDefined(fallbackSiteSettings, settings);
  } catch (error) {
    console.warn("Unable to fetch Sanity site settings; using local fallback.", error);
    return fallbackSiteSettings;
  }
}

export async function getHomePageContent(): Promise<HomePageContent> {
  if (!isSanityEnabled()) return fallbackHomePage;
  try {
    const homePage = await client.fetch<Partial<HomePageContent> | null>(
      HOME_PAGE_QUERY,
      {},
      { cache: "no-store" }
    );
    return mergeHomePage(homePage);
  } catch (error) {
    console.warn("Unable to fetch Sanity home page; using local fallback.", error);
    return fallbackHomePage;
  }
}


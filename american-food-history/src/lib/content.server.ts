import {
  fallbackHomePage,
  fallbackSiteSettings,
  type HomePageContent,
  type SiteSettingsContent,
} from "@/lib/site-content";
import { isSanityEnabled } from "@/lib/cms";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  if (!isSanityEnabled()) return fallbackSiteSettings;
  try {
    const settings = await client.fetch<SiteSettingsContent | null>(
      SITE_SETTINGS_QUERY,
      {},
      { cache: "no-store" }
    );
    if (!settings) {
      throw new Error("Sanity siteSettings document is missing.");
    }
    return settings;
  } catch (error) {
    console.warn("Unable to fetch Sanity site settings; using local fallback.", error);
    return fallbackSiteSettings;
  }
}

export async function getHomePageContent(): Promise<HomePageContent> {
  if (!isSanityEnabled()) return fallbackHomePage;
  try {
    const homePage = await client.fetch<HomePageContent | null>(
      HOME_PAGE_QUERY,
      {},
      { cache: "no-store" }
    );
    if (!homePage) {
      throw new Error("Sanity homePage document is missing.");
    }
    return homePage;
  } catch (error) {
    console.warn("Unable to fetch Sanity home page; using local fallback.", error);
    return fallbackHomePage;
  }
}

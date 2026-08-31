import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

function resolveSanityReadToken(): string | undefined {
  const token = process.env.SANITY_API_READ_TOKEN?.trim();
  if (!token || token.includes("...") || token.includes("viewer_token")) {
    return undefined;
  }
  return token;
}

const token = resolveSanityReadToken();

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  // Always hit the live API, never the eventually-consistent API CDN, so a
  // publish in Sanity Studio is reflected on the site on the next request.
  // These pages are SSR-dynamic and low-traffic, so the CDN buys nothing here.
  useCdn: false,
});

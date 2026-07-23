import { getEntitledSlugs, isValidDownloadSlug } from "./entitlements";
import { isStripeConfigured } from "./env";
import type { ProductSlug } from "./products";
import { getProductBySlugForCheckout } from "./products.server";
import { getStripe } from "./stripe";

export type EntitlementReason =
  | "paid"
  | "not_configured"
  | "unpaid"
  | "invalid_product"
  | "not_entitled"
  | "invalid_slug"
  | "error";

export interface EntitlementResult {
  entitled: boolean;
  entitledSlugs: string[];
  customerEmail?: string | null;
  reason: EntitlementReason;
}

export async function verifySessionEntitlement(
  sessionId: string,
  downloadSlug?: string
): Promise<EntitlementResult> {
  if (!isStripeConfigured()) {
    return { entitled: false, entitledSlugs: [], reason: "not_configured" };
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid =
      session.status === "complete" && session.payment_status === "paid";

    if (!isPaid) {
      return { entitled: false, entitledSlugs: [], reason: "unpaid" };
    }

    const purchasedSlug = session.metadata?.productSlug as
      | ProductSlug
      | undefined;

    if (!purchasedSlug || !(await getProductBySlugForCheckout(purchasedSlug))) {
      return { entitled: false, entitledSlugs: [], reason: "invalid_product" };
    }

    const entitledSlugs = await getEntitledSlugs(purchasedSlug);

    if (downloadSlug) {
      if (!(await isValidDownloadSlug(downloadSlug))) {
        return { entitled: false, entitledSlugs: [], reason: "invalid_slug" };
      }
      if (!entitledSlugs.includes(downloadSlug as (typeof entitledSlugs)[number])) {
        return { entitled: false, entitledSlugs: [], reason: "not_entitled" };
      }
    }

    return {
      entitled: true,
      entitledSlugs,
      customerEmail: session.customer_details?.email,
      reason: "paid",
    };
  } catch {
    return { entitled: false, entitledSlugs: [], reason: "error" };
  }
}

import Stripe from "stripe";
import { requireStripeSecretKey } from "./env";

export { getSiteUrl } from "./site-url";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(requireStripeSecretKey());
  }
  return stripeInstance;
}

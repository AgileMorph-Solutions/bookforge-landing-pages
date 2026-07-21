import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireWebhookSecret } from "@/lib/env";
import { getProductBySlug, type ProductSlug } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const productSlug = session.metadata?.productSlug as ProductSlug | undefined;

  if (!productSlug || !getProductBySlug(productSlug)) {
    console.error(
      `Webhook: invalid productSlug in session ${session.id}: ${productSlug}`
    );
    return;
  }

  console.log(
    `Payment completed: session=${session.id}, product=${productSlug}, email=${session.customer_details?.email}`
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let webhookSecret: string;
  try {
    webhookSecret = requireWebhookSecret();
  } catch {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      handleCheckoutSessionCompleted(
        event.data.object as Stripe.Checkout.Session
      );
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

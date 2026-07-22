import { NextRequest, NextResponse } from "next/server";
import { StripeConfigError, isStripeConfigured } from "@/lib/env";
import type { ProductSlug } from "@/lib/products";
import { getProductBySlugForCheckout, validatePdfsAvailableForPurchase } from "@/lib/products.server";
import { getSiteUrl, getStripe } from "@/lib/stripe";

function absoluteUrl(siteUrl: string, url: string): string {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Payment system not configured. Contact support." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const productSlug = body.productSlug as ProductSlug;

    const product = await getProductBySlugForCheckout(productSlug);
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const pdfCheck = await validatePdfsAvailableForPurchase(product.slug);
    if (!pdfCheck.ok) {
      const missing =
        pdfCheck.missingTitles.length > 0
          ? ` Missing: ${pdfCheck.missingTitles.join(", ")}.`
          : "";
      return NextResponse.json(
        {
          error: `This book's PDF is not available yet. Please check back soon.${missing}`,
          code: "PDF_NOT_READY",
          missingTitles: pdfCheck.missingTitles,
        },
        { status: 422 }
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_creation: "always",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.subtitle,
              images: product.coverImage
                ? [absoluteUrl(siteUrl, product.coverImage)]
                : undefined,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productSlug: product.slug,
      },
      payment_intent_data: {
        metadata: {
          productSlug: product.slug,
        },
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof StripeConfigError) {
      return NextResponse.json(
        { error: "Payment system not configured. Contact support." },
        { status: 503 }
      );
    }
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

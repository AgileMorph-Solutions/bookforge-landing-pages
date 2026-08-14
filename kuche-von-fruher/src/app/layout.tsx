import type { Metadata } from "next";
import { Libre_Caslon_Text, Work_Sans } from "next/font/google";
import { CountdownBanner } from "@/components/ui/CountdownBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { getHomePageContent, getSiteSettings } from "@/lib/content.server";
import { getProductsForLanding } from "@/lib/products.server";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const dynamic = "force-dynamic";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

function absoluteUrl(url: string): string {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, homePage, { bundle }] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
    getProductsForLanding(),
  ]);
  const image = siteSettings.ogImage ?? bundle.coverImage;
  const icon = siteSettings.logo ?? "/images/logo.png";

  return {
    metadataBase: new URL(siteUrl),
    title: homePage.seoTitle,
    description: homePage.seoDescription,
    icons: {
      icon: absoluteUrl(icon),
      apple: absoluteUrl(icon),
    },
    openGraph: {
      title: siteSettings.seoTitle ?? homePage.seoTitle,
      description: siteSettings.seoDescription ?? homePage.seoDescription,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.seoTitle ?? homePage.seoTitle,
      description: siteSettings.seoDescription ?? homePage.seoDescription,
      images: [absoluteUrl(image)],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, homePage, { bundle }] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
    getProductsForLanding(),
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteSettings.name,
        url: siteUrl,
      },
      {
        "@type": "Product",
        name: bundle.title,
        description: bundle.subtitle,
        image: absoluteUrl(bundle.coverImage),
        offers: {
          "@type": "Offer",
          price: bundle.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${libreCaslon.variable} ${workSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="paper-texture antialiased pb-20 md:pb-0">
        <CountdownBanner {...homePage.countdownBanner} />
        <Header
          siteSettings={siteSettings}
          navLinks={homePage.navigation.links}
          bundle={bundle}
        />
        <main>{children}</main>
        <Footer
          siteSettings={siteSettings}
          footer={homePage.footer}
          navLinks={homePage.navigation.links}
        />
        <StickyCTA bundle={bundle} />
      </body>
    </html>
  );
}

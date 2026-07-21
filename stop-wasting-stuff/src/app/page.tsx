import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Library } from "@/components/sections/Library";
import { CostComparison } from "@/components/sections/CostComparison";
import { WhatsInside } from "@/components/sections/WhatsInside";
import { RecipePreviews } from "@/components/sections/RecipePreviews";
import { YouTubeSection } from "@/components/sections/YouTubeSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Guarantee } from "@/components/sections/Guarantee";
import { OrderSection } from "@/components/sections/OrderSection";
import { FAQ } from "@/components/sections/FAQ";
import { LastCall } from "@/components/sections/LastCall";
import { getHomePageContent, getSiteSettings } from "@/lib/content.server";
import { getProductsForLanding } from "@/lib/products.server";

export default async function HomePage() {
  const [homePage, siteSettings, { individualBooks, bundle }] =
    await Promise.all([
      getHomePageContent(),
      getSiteSettings(),
      getProductsForLanding(),
    ]);

  return (
    <>
      <Hero content={homePage.hero} bundle={bundle} />
      <SocialProof siteSettings={siteSettings} />
      <Library
        content={homePage.library}
        individualBooks={individualBooks}
        bundle={bundle}
        contentUnitLabel={siteSettings.contentUnitLabel}
      />
      <CostComparison content={homePage.costComparison} bundle={bundle} />
      <WhatsInside
        content={homePage.whatsInside}
        individualBooks={individualBooks}
        bundle={bundle}
        contentUnitLabel={siteSettings.contentUnitLabel}
      />
      <RecipePreviews content={homePage.recipePreviews} />
      <YouTubeSection
        content={homePage.youtube}
        siteSettings={siteSettings}
        bundle={bundle}
      />
      <Testimonials content={homePage.testimonials} />
      <Guarantee content={homePage.guarantee} />
      <OrderSection
        content={homePage.order}
        individualBooks={individualBooks}
        bundle={bundle}
      />
      <FAQ
        content={homePage.faq}
        individualBooks={individualBooks}
        bundle={bundle}
      />
      <LastCall
        content={homePage.lastCall}
        siteSettings={siteSettings}
        bundle={bundle}
        individualBooks={individualBooks}
      />
    </>
  );
}

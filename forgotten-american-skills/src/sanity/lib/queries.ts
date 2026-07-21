import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] | order(sortOrder asc, title asc) {
    _id,
    "slug": slug.current,
    title,
    shortTitle,
    subtitle,
    price,
    compareAt,
    "coverImage": coalesce(coverImage.asset->url, coverImagePath),
    pdfFilename,
    recipeCount,
    era,
    themes,
    highlights,
    featured,
    isBundle,
    "includedProductSlugs": includedProducts[]->slug.current,
    sortOrder
  }
`);

const imageUrl = `"image": coalesce(image.asset->url, imagePath)`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    name,
    tagline,
    youtubeUrl,
    youtubeSubscribers,
    averageRating,
    readerCount,
    guaranteeDays,
    firstEditionSpotsLeft,
    bundlePriceEndAt,
    seoTitle,
    seoDescription,
    "logo": logo.asset->url,
    "ogImage": ogImage.asset->url
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    seoTitle,
    seoDescription,
    countdownBanner,
    navigation {
      links[] { label, href }
    },
    hero,
    library,
    costComparison {
      ...,
      modern[] { label, cost },
      vintage[] { label, cost }
    },
    whatsInside,
    recipePreviews {
      headline,
      items[] {
        name,
        era,
        detail,
        bookSlug,
        ${imageUrl}
      }
    },
    testimonials {
      eyebrow,
      headline,
      body,
      items[] { quote, author, location, source, rating }
    },
    youtube {
      ...,
      stats[] { value, label }
    },
    guarantee,
    order,
    faq {
      eyebrow,
      headline,
      items[] { question, answer }
    },
    lastCall,
    footer
  }
`);

export const PRODUCT_DOWNLOAD_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    title,
    pdfFilename,
    "pdfUrl": pdfFile.asset->url,
    "pdfAssetId": pdfFile.asset->_id
  }
`);


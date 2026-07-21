import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Link", type: "string" }),
];

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countdownBanner",
      title: "Countdown banner",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "prefix", title: "Timer prefix", type: "string" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "href", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headlineStart", title: "Headline start", type: "string" }),
        defineField({ name: "headlineAccent", title: "Headline accent", type: "string" }),
        defineField({
          name: "headlineEnd",
          title: "Headline ending",
          type: "string",
        }),
        defineField({ name: "subheadline", type: "text", rows: 4 }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "object",
          fields: ctaFields,
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "object",
          fields: ctaFields,
        }),
        defineField({ name: "badge", title: "Book badge", type: "string" }),
      ],
    }),
    defineField({
      name: "library",
      title: "Library section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "costComparison",
      title: "Cost comparison",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        defineField({ name: "modernTitle", type: "string" }),
        defineField({ name: "modernSubtitle", type: "string" }),
        defineField({ name: "vintageTitle", type: "string" }),
        defineField({ name: "vintageSubtitle", type: "string" }),
        defineField({
          name: "modern",
          title: "Modern rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "cost", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "vintage",
          title: "Vintage rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "cost", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({ name: "footer", type: "string" }),
      ],
    }),
    defineField({
      name: "whatsInside",
      title: "What's inside",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "recipePreviews",
      title: "Recipe previews",
      type: "object",
      fields: [
        defineField({ name: "headline", type: "string" }),
        defineField({
          name: "items",
          title: "Recipes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", type: "string" }),
                defineField({ name: "era", type: "string" }),
                defineField({ name: "detail", type: "string" }),
                defineField({ name: "bookSlug", type: "string" }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "imagePath",
                  title: "Local fallback image path",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "quote", type: "text", rows: 4 }),
                defineField({ name: "author", type: "string" }),
                defineField({ name: "location", type: "string" }),
                defineField({ name: "source", type: "string" }),
                defineField({ name: "rating", type: "number" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "youtube",
      title: "YouTube section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 5 }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "value", type: "string" }),
                defineField({ name: "label", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({ name: "youtubeCtaLabel", type: "string" }),
        defineField({ name: "purchaseCtaLabel", type: "string" }),
      ],
    }),
    defineField({
      name: "guarantee",
      title: "Guarantee",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 4 }),
        defineField({ name: "note", type: "string" }),
      ],
    }),
    defineField({
      name: "order",
      title: "Order section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "subheadline", type: "text", rows: 3 }),
        defineField({ name: "individualNote", type: "text", rows: 3 }),
        defineField({ name: "trustLine", type: "string" }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "question", type: "string" }),
                defineField({ name: "answer", type: "text", rows: 4 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "lastCall",
      title: "Last call",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        defineField({ name: "spotsLine", type: "string" }),
        defineField({ name: "ctaLabel", type: "string" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "tagline", type: "string" }),
        defineField({ name: "disclaimer", type: "text", rows: 4 }),
        defineField({ name: "copyrightLine", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});


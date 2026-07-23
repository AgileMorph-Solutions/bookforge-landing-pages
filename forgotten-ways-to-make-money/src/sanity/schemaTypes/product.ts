import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "compareAt",
      title: "Compare at price",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImagePath",
      title: "Local cover image path",
      type: "string",
      description:
        "Optional fallback path for existing public images, for example /images/covers/bundle.png.",
    }),
    defineField({
      name: "pdfFilename",
      title: "PDF filename",
      type: "string",
      description:
        "Keep this aligned with the uploaded/downloadable PDF filename used by checkout fulfillment.",
    }),
    defineField({
      name: "pdfFile",
      title: "Protected PDF file",
      type: "file",
      description:
        "Paid cookbook PDF. The website serves this only through the protected download API.",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "recipeCount",
      title: "Recipe count",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "era",
      title: "Era",
      type: "string",
    }),
    defineField({
      name: "themes",
      title: "Themes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "featured",
      title: "Featured product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isBundle",
      title: "Bundle product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "includedProducts",
      title: "Included products",
      type: "array",
      description: "For bundles, choose the individual books this purchase unlocks.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      hidden: ({ parent }) => !parent?.isBundle,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "coverImage",
    },
  },
});


import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "seoTitle",
      title: "Default SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "youtubeSubscribers",
      title: "YouTube subscribers",
      type: "string",
    }),
    defineField({
      name: "averageRating",
      title: "Average rating",
      type: "string",
    }),
    defineField({
      name: "readerCount",
      title: "Reader count",
      type: "string",
    }),
    defineField({
      name: "guaranteeDays",
      title: "Guarantee days",
      type: "number",
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: "firstEditionSpotsLeft",
      title: "First edition spots left",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "bundlePriceEndAt",
      title: "Bundle price ends at",
      type: "number",
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: "contentUnitLabel",
      title: "Content unit label",
      type: "string",
      description: "Label for per-book counts, e.g. tips, recipes, lessons.",
    }),
    defineField({
      name: "successDownloadLabel",
      title: "Success page download label",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});


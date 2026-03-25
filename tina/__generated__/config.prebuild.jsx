// tina/config.ts
import { defineConfig } from "tinacms";
var seoFields = [
  {
    type: "string",
    name: "title",
    label: "SEO Title",
    required: true
  },
  {
    type: "string",
    name: "description",
    label: "SEO Description",
    ui: { component: "textarea" }
  }
];
var ctaFields = [
  {
    type: "string",
    name: "heading",
    label: "Heading",
    required: true
  },
  {
    type: "string",
    name: "description",
    label: "Description"
  },
  {
    type: "object",
    name: "buttons",
    label: "Buttons",
    list: true,
    fields: [
      {
        type: "string",
        name: "label",
        label: "Label",
        required: true
      },
      {
        type: "string",
        name: "href",
        label: "Link",
        required: true
      },
      {
        type: "string",
        name: "variant",
        label: "Variant",
        options: ["primary", "secondary", "outline"]
      }
    ]
  }
];
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "img"
    }
  },
  schema: {
    collections: [
      // ─── Site Settings (singleton) ───
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "src/content",
        format: "json",
        match: { include: "settings" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          {
            type: "string",
            name: "phone",
            label: "Phone",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true
          },
          {
            type: "object",
            name: "address",
            label: "Address",
            fields: [
              { type: "string", name: "street", label: "Street" },
              { type: "string", name: "cityCs", label: "City (CZ)" },
              { type: "string", name: "cityEn", label: "City (EN)" }
            ]
          },
          {
            type: "string",
            name: "companyName",
            label: "Company Name"
          },
          {
            type: "string",
            name: "siteUrl",
            label: "Site URL"
          }
        ]
      },
      // ─── Page: Home ───
      {
        name: "pageHome",
        label: "Page \u2014 Home",
        path: "src/content/pages",
        format: "json",
        match: { include: "{cs,en}/index" },
        fields: [
          { type: "string", name: "lang", label: "Language", required: true },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: seoFields
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subheading", label: "Subheading" },
              { type: "string", name: "subheadingAccent", label: "Subheading Accent (gradient text)" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Primary CTA Label" },
              { type: "string", name: "ctaSecondary", label: "Secondary CTA Label" }
            ]
          },
          {
            type: "object",
            name: "badges",
            label: "Stat Badges",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label" }
            ]
          },
          {
            type: "object",
            name: "services",
            label: "Services Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Service Cards",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "href", label: "Link" },
                  { type: "string", name: "linkText", label: "Link Text" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "whyUs",
            label: "Why Us Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                  { type: "image", name: "icon", label: "Icon" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "forWhom",
            label: "For Whom Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Text" }
                ]
              },
              { type: "image", name: "image", label: "Image" }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: ctaFields
          }
        ]
      },
      // ─── Page: About ───
      {
        name: "pageAbout",
        label: "Page \u2014 About",
        path: "src/content/pages",
        format: "json",
        match: { include: "{cs,en}/about" },
        fields: [
          { type: "string", name: "lang", label: "Language", required: true },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: seoFields
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (gradient text)" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "story",
            label: "Our Story",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "paragraphs",
                label: "Paragraphs",
                list: true,
                ui: { component: "textarea" }
              },
              { type: "image", name: "image", label: "Image" }
            ]
          },
          {
            type: "object",
            name: "values",
            label: "Values Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Value Items",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: ctaFields
          }
        ]
      },
      // ─── Page: Services ───
      {
        name: "pageServices",
        label: "Page \u2014 Services",
        path: "src/content/pages",
        format: "json",
        match: { include: "{cs,en}/services" },
        fields: [
          { type: "string", name: "lang", label: "Language", required: true },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: seoFields
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (gradient text)" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "serviceDetails",
            label: "Service Details",
            list: true,
            fields: [
              { type: "string", name: "id", label: "Anchor ID" },
              { type: "string", name: "number", label: "Number" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true
              },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "ctaText", label: "CTA Text" },
              { type: "string", name: "ctaHref", label: "CTA Link" }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Section",
            fields: ctaFields
          }
        ]
      },
      // ─── Page: Contact ───
      {
        name: "pageContact",
        label: "Page \u2014 Contact",
        path: "src/content/pages",
        format: "json",
        match: { include: "{cs,en}/contact" },
        fields: [
          { type: "string", name: "lang", label: "Language", required: true },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: seoFields
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (gradient text)" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "contactInfo",
            label: "Contact Information",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "email", label: "Email" },
              {
                type: "object",
                name: "location",
                label: "Location",
                fields: [
                  { type: "string", name: "companyName", label: "Company Name" },
                  { type: "string", name: "street", label: "Street" },
                  { type: "string", name: "city", label: "City" }
                ]
              }
            ]
          },
          {
            type: "string",
            name: "mapEmbedUrl",
            label: "Google Maps Embed URL",
            ui: { component: "textarea" }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

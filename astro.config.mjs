import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import vercel from "@astrojs/vercel/static";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://astrofolio-mu.vercel.app",
  integrations: [
    mdx({
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
          langs: [],
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: {
              className: "anchor",
            },
          },
        ],
        rehypeKatex,
      ],
      gfm: true,
    }),
    sitemap(),
    tailwind(),
    react({
      experimentalReactChildren: true,
    }),
    icon(),
    sitemap(),
  ],

  output: "static",
  adapter: vercel({
    isr: true,
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
});

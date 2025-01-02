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
import opengraphImages, { presets } from "astro-opengraph-images";
import fs from 'fs';

// https://astro.build/config
export default defineConfig({
  site: "https://www.wojciechsmolarek.pl/",
  trailingSlash: 'never',
  integrations: [
    mdx({
      image: {
        domains: ["unsplash.com"],
      },
      optimize: true,
      shikiConfig: {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        langs: [],
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
    sitemap({
      filter: (page) => {
        const noIndexPages = ['/photos']; 
        return !noIndexPages.includes(page);
      },
    }),
    tailwind(),
    react({
      experimentalReactChildren: true,
    }),
    icon({
      include: {
        "fa6-solid": ["rss", "circle-half-stroke", "caret-down", "bars"],
        tabler: ["mail-filled"],
        "fa6-brands": ["x-twitter", "github", "instagram", "linkedin-in"],
      },
    }),
    opengraphImages({
      render: presets.waveSvg,
      options: {
        fonts: [
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff"
            ),
          },
        ],
      },
    }),
  ],
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: false,
    },
    imageService: true,
    devImageService: "sharp",
  }),
});

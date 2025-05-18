import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import characterRubyPlugin from "./src/plugins/characterRubyPlugin";
import multimdTable from "markdown-it-multimd-table";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/fuzhou-gan/" : "/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(characterRubyPlugin);
        md.use(multimdTable, {
          rowspan: true,
          multiline: true,
          colspan: true,
        });
      },
    }),
  ],
});

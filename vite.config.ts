import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import Markdown from "unplugin-vue-markdown/vite";
import characterRubyPlugin from "./src/plugins/characterRubyPlugin";
import phrasePlugin from "./src/plugins/phrasePlugin";
import multimdTable from "markdown-it-multimd-table";

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    target: "esnext",
  },
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
    svgLoader(),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(characterRubyPlugin);
        md.use(phrasePlugin);
        md.use(multimdTable, {
          rowspan: true,
          multiline: true,
          colspan: true,
        });

        // add target="_blank" rel="noopener noreferrer" to links
        const defaultRender =
          md.renderer.rules.link_open ||
          function (tokens, idx, options, _env, self) {
            return self.renderToken(tokens, idx, options);
          };
        md.renderer.rules.link_open = function (
          tokens,
          idx,
          options,
          env,
          self
        ) {
          const targetIndex = tokens[idx].attrIndex("target");
          if (targetIndex < 0) {
            tokens[idx].attrPush(["target", "_blank"]);
          } else {
            tokens[idx].attrs![targetIndex][1] = "_blank";
          }
          const relIndex = tokens[idx].attrIndex("rel");
          if (relIndex < 0) {
            tokens[idx].attrPush(["rel", "noopener noreferrer"]);
          } else {
            tokens[idx].attrs![relIndex][1] = "noopener noreferrer";
          }
          return defaultRender(tokens, idx, options, env, self);
        };
      },
    }),
  ],
});

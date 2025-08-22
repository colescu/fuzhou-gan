import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import Markdown from "unplugin-vue-markdown/vite";
import vueDevTools from "vite-plugin-vue-devtools";

import { markdownItSetup } from "./src/plugins/vite/markdownItSetup";

export default (configEnv: ConfigEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), "");
  return defineConfig({
    esbuild: {
      target: "esnext",
    },
    base: env.VITE_BASE || "/",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".vue", ".ts", ".js", ".json", ".md"],
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "rb",
          },
        },
      }),
      svgLoader(),
      Markdown({
        wrapperComponent: "MarkdownWrapper",
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup,
      }),
      vueDevTools(),
    ],
    define: {
      __LAST_UPDATE__: JSON.stringify(new Date().toISOString()),
    },
    ssr: {
      noExternal: ["naive-ui", "vueuc"],
    },
  });
};

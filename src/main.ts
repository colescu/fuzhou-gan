import { setupGoogleAnalytics } from "./analytics";

import { ViteSSG } from "vite-ssg";
import "./styles/main.css";
import App from "./App.vue";
import routerOptions from "./router/router";
import createPiniaInstance from "./stores/pinia";

import { initCoreData } from "./library/data/core-data";
import { initLangUtils } from "./library/lang-utils/init";
import { registerComponents } from "./plugins/vue/registerComponents";
import { ROUTES } from "./router/routes";

setupGoogleAnalytics();

export const createApp = ViteSSG(App, routerOptions, async ({ app }) => {
  const pinia = createPiniaInstance();
  app.use(pinia);

  await Promise.all([initCoreData(), initLangUtils(), registerComponents(app)]);

  app.config.globalProperties.$ROUTES = ROUTES;
});

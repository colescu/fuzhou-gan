import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import fetchData from "./library/fetchData";
import CharacterRuby from "./components/CharacterRuby.vue";
import Phrase from "./components/Phrase.vue";

async function bootstrap() {
  const app = createApp(App);

  // fetch data before mounting the app
  await fetchData();

  app.use(router);

  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  // import globally for use in md files
  app.component("CharacterRuby", CharacterRuby);
  app.component("Phrase", Phrase);

  app.mount("#app");
}

bootstrap();

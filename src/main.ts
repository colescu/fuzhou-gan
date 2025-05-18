import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import fetchData from "./lib/fetchData";
import CharacterRuby from "./components/CharacterRuby.vue";

const app = createApp(App);

await fetchData();

app.use(router);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.component("CharacterRuby", CharacterRuby);

app.mount("#app");

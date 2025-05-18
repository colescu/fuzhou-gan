import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Introduction from "../content/introduction.md";
import Phonology from "../views/Phonology.vue";
import Vocabulary from "../views/Vocabulary.vue";
import Search from "../views/Search.vue";
import Pronounce from "../views/Pronounce.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/introduction", name: "Introduction", component: Introduction },
  { path: "/phonology", name: "Phonology", component: Phonology },
  { path: "/vocbulary", name: "Vocbulary", component: Vocabulary },
  { path: "/search", name: "Search", component: Search },
  { path: "/pronounce", name: "Pronounce", component: Pronounce },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

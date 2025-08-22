import { createWebHistory, createMemoryHistory } from "vue-router";
import { languageRouting } from "@/composables/useParamRouting";

import Home from "@/views/Home.vue";
import Introduction from "@/content/introduction.md";
import Phonology from "@/views/Phonology.vue";
import Vocabulary from "@/views/Vocabulary.vue";
import LangWrapper from "@/components/wrapper/LangWrapper.vue";
import Search from "@/components/search/Search.vue";
import Pronounce from "@/components/pronounce/Pronounce.vue";
import MCTableView from "@/views/MCTableView.vue";
import MoreSettings from "@/views/MoreSettings.vue";

const routes = [
  { path: "/", name: "Home", component: () => import("@/views/Home.vue") },
  {
    path: "/introduction",
    name: "Introduction",
    component: () => import("@/content/introduction.md"),
  },
  {
    path: "/phonology",
    name: "Phonology",
    component: () => import("@/views/Phonology.vue"),
  },
  {
    path: "/vocabulary",
    name: "Vocabulary",
    component: () => import("@/views/Vocabulary.vue"),
  },
  {
    path: "/:language?",
    name: "LangWrapper",
    component: () => import("@/components/wrapper/LangWrapper.vue"),
    props: true,
    beforeEnter: languageRouting,
    children: [
      {
        path: "search",
        name: "Search",
        component: () => import("@/components/search/Search.vue"),
      },
      {
        path: "pronounce",
        name: "Pronounce",
        component: () => import("@/components/pronounce/Pronounce.vue"),
      },
    ],
  },
  {
    path: "/mc-table",
    name: "MCTableView",
    component: import("@/views/MCTableView.vue"),
    meta: { hideNavbar: true },
  },
  {
    path: "/settings",
    name: "MoreSettings",
    component: () => import("@/views/MoreSettings.vue"),
  },
];

const routerOptions = {
  history: (typeof window !== "undefined"
    ? createWebHistory
    : createMemoryHistory)(import.meta.env.BASE_URL),
  routes,
  // @ts-ignore
  scrollBehavior: async (to, from, savedPosition) => {
    if (to.fullPath === from.fullPath) return false;
    if (savedPosition) return savedPosition;
    if (!to.hash) return { left: 0, top: 0 };

    // scroll to anchor
    return new Promise(() => {
      setTimeout(() => {
        const id = decodeURIComponent(to.hash.slice(1));
        const el = document.getElementById(id);

        const navbar = document.querySelector("#navbar");
        let navbarHeight = 0;
        if (navbar) {
          navbarHeight = (navbar as HTMLElement).offsetHeight;
        }

        if (el) {
          const style = window.getComputedStyle(el);
          const emInPx = parseFloat(style.fontSize);
          const top =
            (el as HTMLElement).getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            emInPx;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 500); // wait for rendering
    });
  },
};

export default routerOptions;

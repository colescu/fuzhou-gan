import { defineStore } from "pinia";
import type { SearchTab } from "../views/Search.vue";

export const useCacheStore = defineStore("cache", {
  state: () => ({
    pronounce: {
      input: "" as string,
      outputChoices: [] as number[],
    },
    search: {
      tab: "char" as SearchTab,
    },
  }),
  persist: true,
});

import { defineStore } from "pinia";
import type {
  PhonologyFGTab,
  PhonologyMCTab,
  PhonologyTab,
} from "../views/Phonology.vue";
import type { SearchTab } from "../views/Search.vue";
import type { VocabularyTab } from "../views/Vocabulary.vue";

export const useCacheStore = defineStore("cache", {
  state: () => ({
    phonology: {
      phonology: "FG" as PhonologyTab,
      FG: "initial" as PhonologyFGTab,
      MC: "characteristics" as PhonologyMCTab,
    },
    vocabulary: {
      vocabulary: "characters" as VocabularyTab,
    },
    search: {
      tab: "char" as SearchTab,
    },
    pronounce: {
      input: "" as string,
      outputChoices: [] as number[],
    },
  }),
  persist: true,
});

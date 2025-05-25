import { defineStore } from "pinia";
import type {
  PhonologyFGTab,
  PhonologyMCTab,
  PhonologyOtherTab,
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
      other: "PM" as PhonologyOtherTab,
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

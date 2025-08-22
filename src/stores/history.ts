import { defineStore } from "pinia";
import { fromEntriesConst } from "@/library/common/object";
import { LANGUAGES } from "../library/constants/language";
import type { ValidPredictForm } from "@/library/reflex-table/form-predict";
import type { Style } from "@/components/pronounce/InterlinearBlock.vue";
import type { LangMode } from "@/components/search/SearchLang.vue";
import type { Part } from "@/library/lang-utils/parts";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    phonology: {
      tab: "",
      phoneticsSubtab: "",
      learnSubtab: "",
      predictForm: null as ValidPredictForm | null,
      rhymeTable: {
        輕: true,
        老: true,
        新: true,
        官: true,
        1: true,
        2: true,
        3: true,
        5: true,
        7: true,
        8: true,
      },
    },
    vocabulary: {
      tab: "",
      corpusSubtab: "",
      // TODO save current char
    },
    search: {
      tab: "",
      langMode: 0 as LangMode,
      searchLanguage: "FG" as Language,
      searchResults: null as number[] | null,
      page: 1,
    },
    pronounce: {
      input: "" as string,
      outputChoicesMap: fromEntriesConst(
        LANGUAGES.map((language) => [language, []])
      ) as Record<Language, number[]>,
      outputStyle: "interlinear" as Style,
      prefer新: false,
      prefer文: false,
    },
    languages: [...LANGUAGES], // ordering
    orderingParts: ["韻腹", "介音", "韻尾"] as Part[],
  }),
  persist: true,
});

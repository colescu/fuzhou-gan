import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    format: "pinyin" as Format, // preferred representation
    displayBoth: true,
    pinyinToneNotation: "diacritic" as PinyinToneNotation,
    ipaToneNotation: "letter" as IpaToneNotation,
    includePredicted: true,
    playSpeed: 500,
    isSimplified: true,
    colorizeChar: true,
    orderingMCInfo: ["聲母", "攝", "韻系", "重紐", "等", "呼", "聲調"],
  }),
  persist: true,
});

import { defineStore } from "pinia";

export type PhoneticAlphabet = "ipa" | "pinyin";
export type IpaToneNotation = "raw" | "letter" | "numeral";
export type PinyinToneNotation = "number" | "diacritic";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    phoneticAlphabet: "pinyin" as PhoneticAlphabet,
    pinyinToneNotation: "diacritic" as PinyinToneNotation,
    ipaToneNotation: "letter" as IpaToneNotation,
    displayPinyin: true,
    displayIpa: true,
    includePredicted: true,
    displayPronunciation: true,
    isSimplified: true,
  }),
  persist: true,
});

export type SettingsStore = ReturnType<typeof useSettingsStore>;

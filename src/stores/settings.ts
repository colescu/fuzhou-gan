import { defineStore } from "pinia";

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
    playSpeed: 500,
  }),
  persist: true,
});

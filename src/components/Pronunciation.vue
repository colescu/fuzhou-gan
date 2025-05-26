<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useAudio } from "../composables/audio";
import { FGUtils } from "../library/FGSyllable";

const { pronunciation, phoneticAlphabet } = defineProps<{
  pronunciation: string; // raw IPA
  phoneticAlphabet?: PhoneticAlphabet;
}>();

const settings = useSettingsStore();

const usedPhoneticAlphabet = computed<PhoneticAlphabet>(() =>
  phoneticAlphabet !== undefined ? phoneticAlphabet : settings.phoneticAlphabet
);
const displayedPronunciation = computed<string>(() => {
  const fg = FGUtils.parseIpa(pronunciation);
  switch (usedPhoneticAlphabet.value) {
    case "ipa":
      return FGUtils.showIpa(fg, settings.ipaToneNotation);
    case "pinyin":
      return FGUtils.showPinyin(fg, settings.pinyinToneNotation);
  }
});

const play = computed(() => useAudio(pronunciation).play);
</script>

<template>
  <span :class="usedPhoneticAlphabet" class="clickable" @click="play">
    {{ displayedPronunciation }}
  </span>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useAudio } from "@/composables/useAudio";
import { syllableUtils } from "@/library/lang-utils/syllable";

const settings = useSettingsStore();

export type DefaultProps = {
  sourceFormat?: Format; // format of input
  language?: Language;
  noAudio?: boolean;
};

const {
  pronunciation,
  format,
  sourceFormat = "pinyin",
  language = "FG",
  noAudio = false,
} = defineProps<
  {
    pronunciation: string;
    format?: Format; // format of output
  } & DefaultProps
>();

const { show } = syllableUtils[language];

const displayedFormat = computed<Format>(() =>
  format ? format : settings.format
);
const displayedPronunciation = computed<string>(() =>
  show(
    pronunciation,
    displayedFormat.value,
    displayedFormat.value === "pinyin"
      ? ["FG", "PM"].includes(language)
        ? settings.pinyinToneNotation
        : "ordinal"
      : settings.ipaToneNotation,
    sourceFormat
  )
);

// change if audios for other languages are added
const playAudio = computed(() =>
  !noAudio && language === "FG"
    ? useAudio(pronunciation, sourceFormat).play
    : undefined
);
</script>

<template>
  <span
    :class="[
      displayedFormat === 'pinyin' ? 'pinyin' : 'ipa',
      { clickable: playAudio !== undefined },
    ]"
    style="font-weight: normal"
    @click="playAudio"
  >
    {{ displayedPronunciation }}
  </span>
</template>

<style scoped></style>

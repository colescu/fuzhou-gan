<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useCacheStore } from "../stores/cache";
import { useManagedSequentialAudio } from "../composables/audio";
import EntryUtils from "../library/entryUtils";

import InterlinearBlock from "../components/InterlinearBlock.vue";
import { NSpace, NInput, NButton, NIcon, NCard, useMessage } from "naive-ui";
import {
  CloseCircle,
  CopyOutline,
  PlayCircleOutline,
  StopCircleOutline,
} from "@vicons/ionicons5";

const settings = useSettingsStore();
const cache = useCacheStore();
const message = useMessage();

const input = toRef(cache.pronounce, "input");
const outputChoices = toRef(cache.pronounce, "outputChoices");
const phrase = computed<RubyData[]>(() =>
  Array.from({ length: input.value.length }).map((_, index) => {
    const char = input.value[index];
    const entries = EntryUtils.getEntries(char, settings.includePredicted);
    const chosenEntry = entries[outputChoices.value[index]];
    const pronunciation =
      chosenEntry === undefined
        ? ""
        : EntryUtils.getFGPronunciation(chosenEntry);
    return {
      character: char,
      pronunciation: pronunciation,
    } as RubyData;
  })
);

watch(input, (newValue, oldValue) => {
  let left = 0,
    right = 0;
  while (left < newValue.length && newValue[left] === oldValue[left]) {
    left += 1;
  }
  while (
    right < Math.min(newValue.length, oldValue.length) - left &&
    newValue[newValue.length - 1 - right] ===
      oldValue[oldValue.length - 1 - right]
  ) {
    right += 1;
  }

  outputChoices.value = [
    ...outputChoices.value.slice(0, left),
    ...new Array(newValue.length - left - right).fill(0),
    ...outputChoices.value.slice(oldValue.length - right),
  ];
});

async function copyToClipboard() {
  const text = phrase.value
    .map((ruby) => `[${ruby.character}]{${ruby.pronunciation}}`)
    .join("");
  await window.navigator.clipboard.writeText(text);
  message.success("複製成功");
}

const pronunciations = computed<string[]>(() =>
  phrase.value.map((ruby) => ruby.pronunciation)
);
const isPlaying = ref<boolean>(false);
const { toggleAudio } = useManagedSequentialAudio(pronunciations, isPlaying);
</script>

<template>
  <n-space vertical>
    <div style="position: relative">
      <n-input
        id="input"
        type="textarea"
        v-model:value="input"
        placeholder="請輸入文本"
        :autosize="{
          minRows: 5,
        }"
      />
      <n-button class="floating-icon" v-if="input" @click="input = ''" text>
        <n-icon :component="CloseCircle" />
      </n-button>
    </div>
    <div style="position: relative">
      <n-card id="output">
        <InterlinearBlock
          v-for="(char, index) in input"
          :key="index"
          :char="char"
          :entries="EntryUtils.getEntries(char, settings.includePredicted)"
          v-model="outputChoices[index]"
        />
      </n-card>
      <n-button
        class="floating-icon"
        v-if="input"
        @click="copyToClipboard"
        text
      >
        <n-icon :component="CopyOutline" />
      </n-button>
      <n-button class="play-button" v-if="input" @click="toggleAudio" text>
        <n-icon
          :component="isPlaying ? StopCircleOutline : PlayCircleOutline"
          size="large"
        />
      </n-button>
    </div>
  </n-space>
</template>

<style scoped>
#input {
  padding: 1em 1em;
}

.floating-icon {
  position: absolute;
  bottom: 1.2em;
  right: 1em;
  z-index: 1;
}

.play-button {
  position: absolute;
  top: 1.2em;
  right: 0.8em;
  z-index: 1;
}
</style>

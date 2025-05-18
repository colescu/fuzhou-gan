<script setup lang="ts">
import { toRef, watch } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useCacheStore } from "../stores/cache";
import EntryUtils from "../lib/entryUtils";

import InterlinearBlock from "../components/InterlinearBlock.vue";
import { NSpace, NInput, NButton, NIcon, NCard, useMessage } from "naive-ui";
import { CloseCircle, CopyOutline } from "@vicons/ionicons5";

const settings = useSettingsStore();
const cache = useCacheStore();
const message = useMessage();

const input = toRef(cache.pronounce, "input");
const outputChoices = toRef(cache.pronounce, "outputChoices");

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
  const text = Array.from({ length: input.value.length })
    .map((_, index) => {
      const char = input.value[index];
      const entries = EntryUtils.getEntries(char, settings.includePredicted);
      const chosenEntry = entries[outputChoices.value[index]];
      return chosenEntry === undefined
        ? char
        : `[${char}]{${EntryUtils.getFG(chosenEntry)}}`;
    })
    .join("");
  await window.navigator.clipboard.writeText(text);
  message.success(settings.isSimplified ? "复制成功" : "複製成功");
}
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
        <n-icon>
          <CloseCircle />
        </n-icon>
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
        <n-icon>
          <CopyOutline />
        </n-icon>
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
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSettingsStore } from "../stores/settings";
import EntryUtils from "../library/entryUtils";
import { isChineseCharacter } from "../library/utils";

import Pronunciation from "./Pronunciation.vue";
import EntryInline from "./EntryInline.vue";
import { NPopover, NRadioGroup, NRadioButton } from "naive-ui";

const settings = useSettingsStore();

const { char, entries } = defineProps<{
  char: string;
  entries: readonly Entry[];
}>();

const choice = defineModel<number>({ default: 0 });
const chosenFGPronunciation = computed<string | null>(() => {
  const chosenEntry = entries[choice.value];
  return chosenEntry === undefined
    ? null
    : EntryUtils.getFGPronunciation(chosenEntry);
});

const showPopover = ref<boolean>(false);
</script>

<template>
  <template v-if="!isChineseCharacter(char)">
    <span class="char pre">{{ char }}</span>
  </template>

  <template v-else-if="entries.length === 0">
    <div class="interlinear">
      <span class="char">{{ char }}</span>
      <span class="no-data">無</span>
    </div>
  </template>

  <template v-else>
    <div class="interlinear">
      <span>
        <n-popover
          trigger="click"
          v-model:show="showPopover"
          style="padding: 0.4em 0"
        >
          <template #trigger>
            <span
              class="char clickable"
              :class="{
                highlight:
                  new Set(
                    entries.map((entry) => EntryUtils.getFGPronunciation(entry))
                  ).size > 1,
              }"
            >
              {{ char }}
            </span>
          </template>

          <n-radio-group
            v-model:value="choice"
            @update:value="showPopover = false"
            @click.stop
          >
            <div class="vertical-radio-buttons">
              <n-radio-button
                v-for="(entry, index) in entries"
                :key="index"
                :value="index"
              >
                <EntryInline :entry="entry" />
              </n-radio-button>
            </div>
          </n-radio-group>
        </n-popover>
      </span>

      <template v-if="chosenFGPronunciation !== null">
        <Pronunciation
          v-if="settings.displayPinyin"
          :pronunciation="chosenFGPronunciation"
          :phonetic-alphabet="'pinyin'"
        />
        <Pronunciation
          v-if="settings.displayIpa"
          :pronunciation="chosenFGPronunciation"
          :phonetic-alphabet="'ipa'"
        />
      </template>
    </div>
  </template>
</template>

<style scoped>
.pre {
  white-space: pre;
}

.no-data {
  color: var(--gray);
}

.interlinear {
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin: 0 0.15em;
  margin-bottom: 1em;
}

.interlinear > span {
  display: block;
}

.vertical-radio-buttons {
  display: flex;
  flex-direction: column;
}

.vertical-radio-buttons .n-radio-button {
  border: none;
  padding: 0 0.6em;
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { trackHasBoth } from "@/composables/useTrack";
import { isChineseCharacter } from "@/library/search/search";

import Pronunciation, { type DefaultProps } from "../content/Pronunciation.vue";
import EntryInline from "./EntryInline.vue";
import ConstrainedPopover from "../common/ConstrainedPopover.vue";
import { NRadioGroup, NRadioButton } from "naive-ui";

const settings = useSettingsStore();

export type Style = "interlinear" | "ruby";
const { char, entries, style, ...rest } = defineProps<
  {
    char: string;
    entries: readonly LangEntry[];
    style: Style;
  } & DefaultProps
>();
const isRuby = computed<boolean>(() => style === "ruby");

const choice = defineModel<number>({ default: 0 });
const chosenPronunciation = computed<string | null>(() => {
  const chosenEntry = entries[choice.value];
  return chosenEntry === undefined ? null : chosenEntry.讀音;
});

watch(
  chosenPronunciation,
  () => {
    if (chosenPronunciation.value == null) {
      choice.value = 0;
    }
  },
  { immediate: true }
);

const showPopover = ref<boolean>(false);

trackHasBoth();
</script>

<template>
  <template v-if="!isChineseCharacter(char)">
    <span class="char" style="white-space: pre">{{ char }}</span>
  </template>

  <template v-else>
    <component :is="isRuby ? 'ruby' : 'div'" class="interlinear">
      <span>
        <ConstrainedPopover v-model:show="showPopover" style="padding: 0.4em 0">
          <template #trigger>
            <component :is="isRuby ? 'rb' : 'span'">
              <span
                class="char"
                :class="{
                  clickable: entries.length > 0,
                  highlight:
                    new Set(
                      entries
                        .filter((entry) => entry.層 !== '官')
                        .map((entry) => entry.讀音)
                    ).size > 1,
                }"
                style="display: inline-block; line-height: 1em"
              >
                {{ char }}
              </span>
            </component>
          </template>

          <n-radio-group
            name="radio"
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
                <EntryInline :entry="entry" v-bind="rest" />
              </n-radio-button>
            </div>
          </n-radio-group>
        </ConstrainedPopover>
      </span>

      <template v-if="!isRuby">
        <template v-if="chosenPronunciation != null">
          <span>
            <Pronunciation
              v-if="settings.format === 'pinyin' || settings.displayBoth"
              :pronunciation="chosenPronunciation"
              format="pinyin"
              v-bind="rest"
            />
          </span>
          <span>
            <Pronunciation
              v-if="settings.format === 'ipaStrict' || settings.displayBoth"
              :pronunciation="chosenPronunciation"
              format="ipaStrict"
              v-bind="rest"
            />
          </span>
        </template>
        <template v-else>
          <span class="no-data">無</span>
        </template>
      </template>

      <template v-else>
        <rp>(</rp>
        <rt>
          <Pronunciation
            v-if="chosenPronunciation != null"
            :pronunciation="chosenPronunciation"
            v-bind="rest"
          />
        </rt>
        <rp>)</rp>
      </template>
    </component>
  </template>
</template>

<style scoped>
.no-data {
  color: var(--gray);
}

.interlinear {
  margin: 0 0.2em;
}

div.interlinear {
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-bottom: 0.8em;
}

div.interlinear > span {
  display: block;
  margin-bottom: 0.1em;
}

ruby rt {
  margin-top: 1em;
  margin-bottom: 0em;
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

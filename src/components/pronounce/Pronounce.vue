<script setup lang="ts">
import { computed, toRef, toRefs, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useHistoryStore } from "@/stores/history";
import { useManagedSequentialAudio } from "@/composables/useAudio";
import { getLangEntries } from "@/library/search/search";
import type { RubyData } from "../content/CharacterRuby.vue";
import {
  trackHasBoth,
  trackHasPhrase,
  trackHasSearch,
} from "@/composables/useTrack";

import InterlinearBlock from "./InterlinearBlock.vue";
import {
  NCard,
  NSpace,
  NInput,
  NButton,
  NIcon,
  NRadioGroup,
  NRadioButton,
  NCheckbox,
  useMessage,
} from "naive-ui";
import {
  CloseCircle,
  CopyOutline,
  PlayCircleOutline,
  StopCircleOutline,
} from "@vicons/ionicons5";

const settings = useSettingsStore();
const message = useMessage();

const { language = "FG" } = defineProps<{ language: Language }>();

const TEXT_LIMIT = 1000 as const;

const history = useHistoryStore();
const { input, outputChoicesMap, outputStyle, prefer新, prefer文 } = toRefs(
  history.pronounce
);
const outputChoices = toRef(outputChoicesMap.value, language);

const entriesArray = computed<LangEntry[][]>(() =>
  Array.from({ length: input.value.length }).map((_, index) => {
    const entries = getLangEntries(input.value[index]!, language);
    if (entries.some((entry) => entry.記錄讀音 != null)) {
      return entries.filter((entry) => entry.記錄讀音 != null);
    } else {
      return settings.includePredicted ? entries : [];
    }
  })
);
const phrase = computed<RubyData[]>(() =>
  entriesArray.value.map((entries, index) => {
    const character = input.value[index]!;
    const chosenEntry = entries[outputChoices.value[index]!];
    const pronunciation = chosenEntry === undefined ? "" : chosenEntry.讀音;
    return { character, pronunciation };
  })
);

function getDefaultPronunciation(entries: LangEntry[]): number {
  const preferredIndices = [...Array(entries.length).keys()].filter((index) => {
    const entry = entries[index]!;
    if (prefer新.value && entry.層?.includes("老")) {
      return false;
    }
    if (prefer文.value && entry.層?.includes("白")) {
      return false;
    }
    return true;
  });
  return preferredIndices?.[0] ?? 0;
}

watch(
  input,
  (newValue, oldValue) => {
    const indices = entriesArray.value.map(getDefaultPronunciation);

    if (oldValue) {
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
        ...indices.slice(left, newValue.length - right),
        ...outputChoices.value.slice(oldValue.length - right),
      ];
    } else {
      outputChoices.value = indices;
    }

    if (newValue.length >= TEXT_LIMIT) {
      message.warning("字数已达上限！");
    }
  },
  { immediate: true }
);

trackHasSearch();

const { toggleAudio, isPlaying } =
  language === "FG" ? useManagedSequentialAudio(phrase) : {};

watch(
  () => language,
  () => {
    if (language === "FG") {
      trackHasPhrase();
    }
  },
  { immediate: true }
);

trackHasBoth();

async function copyToClipboard() {
  const text = phrase.value
    .map((ruby) =>
      ruby.character === "\n"
        ? ruby.character
        : `[${ruby.character}]{${ruby.pronunciation}}`
    )
    .join("");
  await window.navigator.clipboard.writeText(text);
  message.success("複製成功");
}

const isDev = import.meta.env.MODE === "development";
</script>

<template v-if="isReady">
  <n-space vertical>
    <div style="position: relative">
      <n-input
        id="input"
        :input-props="{ name: 'input' }"
        type="textarea"
        :maxlength="TEXT_LIMIT"
        v-model:value="input"
        :placeholder="`請輸入文本（上限 ${TEXT_LIMIT} 字）`"
        :autosize="{ minRows: 5 }"
      />

      <n-button
        class="floating-icon"
        style="bottom: 1em; right: 1em"
        v-if="input"
        @click="input = ''"
        text
      >
        <n-icon :component="CloseCircle" />
      </n-button>
    </div>

    <div style="position: relative">
      <n-card id="output">
        <InterlinearBlock
          v-for="(char, index) in input"
          :key="index"
          :char="char"
          :entries="entriesArray[index]!"
          v-model="outputChoices[index]"
          :language="language"
          :style="outputStyle"
        />
      </n-card>

      <n-button
        class="floating-icon"
        style="top: 1em; right: 1em"
        v-if="isDev && input"
        @click="copyToClipboard"
        text
      >
        <n-icon :component="CopyOutline" />
      </n-button>
      <n-button
        class="floating-icon"
        style="bottom: 0.85em; right: 0.85em"
        v-if="input && language === 'FG'"
        @click="toggleAudio"
        text
      >
        <n-icon
          :component="isPlaying ? StopCircleOutline : PlayCircleOutline"
          size="large"
        />
      </n-button>
    </div>

    <n-space align="center" justify="end" style="margin: 0.5em 0">
      <n-space align="end" vertical>
        <div>
          <span>顯示方式： </span>
          <n-radio-group v-model:value="outputStyle" name="ruby" size="small">
            <n-radio-button value="interlinear"> 对照式 </n-radio-button>
            <n-radio-button value="ruby"> 注音式 </n-radio-button>
          </n-radio-group>
        </div>
        <div>
          <n-checkbox v-model:checked="prefer新">优先新派音</n-checkbox>
          <n-checkbox v-model:checked="prefer文">优先文读音</n-checkbox>
        </div>
      </n-space>
    </n-space>
  </n-space>

  <Teleport to="#help">
    點擊字可查看字條詳情或選擇<span class="highlight">多音字</span
    >的讀音。<br />
    字條中星號 * 標記未收錄的理论推導音。
  </Teleport>
</template>

<style scoped>
#input {
  padding: 1em 1em;
}

#output :deep(.ipa) {
  font-size: 1.1em;
}

.floating-icon {
  position: absolute;
  z-index: 1;
}
</style>

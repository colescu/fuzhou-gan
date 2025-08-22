<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { mcCache } from "@/library/data/core-data";
import { getLangEntries } from "@/library/search/search";

import ConstrainedPopover from "../common/ConstrainedPopover.vue";

const settings = useSettingsStore();

/*
  Three input types:
  - 字
  - 字:ci6
  - 字:2259
*/
const { character } = defineProps<{
  character: string;
}>();

const MC_DICTIONARY = mcCache.get();

const mcIndices = computed<number[]>(() => {
  let mcHint: null | string | number[] = null;
  if (character.includes(":")) {
    mcHint = character.split(":")[1]!;
    if (mcHint[0] && mcHint[0] >= "0" && mcHint[0] <= "9") {
      mcHint = mcHint.split(",").map((s) => Number(s));
    }
  }

  const langEntries = getLangEntries(character[0]!, "FG");
  let indices = langEntries
    .filter(
      (langEntry) => langEntry.記錄讀音 != null && langEntry.小韻號 != null
    )
    .map((langEntry) => langEntry.小韻號) as number[];
  if (indices.length === 0) {
    indices = langEntries
      .map((langEntry) => langEntry.小韻號)
      .filter((index) => index != null);
  }

  if (mcHint != null) {
    if (typeof mcHint === "string") {
      const matchingIndices = indices.filter(
        (index) => MC_DICTIONARY?.[index]?.FG === mcHint
        // TODO BACKEND improve matching algorithm
      );
      if (matchingIndices.length > 0) {
        indices = matchingIndices;
      }
    } else {
      indices = mcHint;
    }
  }

  return [...new Set(indices)].sort();
});

const isDev = import.meta.env.MODE === "development";
</script>

<template>
  <ConstrainedPopover trigger="hover" style="padding: 0.4em 0">
    <template #trigger>
      <span
        class="char"
        :class="{ highlight: isDev && mcIndices.length !== 1 }"
      >
        {{ character[0] }}
      </span>
    </template>

    <div class="vertical-rows">
      <span v-for="(mcIndex, index) in mcIndices" :key="index" :value="index">
        <template v-if="isDev">
          {{ mcIndex }} {{ MC_DICTIONARY?.[mcIndex]?.FG }}
        </template>
        {{ MC_DICTIONARY?.[mcIndex]?.MC.音韻地位(settings.orderingMCInfo) }}
      </span>
    </div>
  </ConstrainedPopover>
</template>

<style scoped>
.vertical-rows {
  display: flex;
  flex-direction: column;
  min-width: max-content;
}

.vertical-rows span {
  border: none;
  padding: 0 0.6em;
}

.highlight {
  background-color: red;
}
</style>

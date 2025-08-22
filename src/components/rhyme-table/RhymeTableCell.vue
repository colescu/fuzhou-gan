<script setup lang="ts">
import { computed } from "vue";
import { dictionaryCache, syllableDataCache } from "@/library/data/core-data";
import { syllableUtils } from "@/library/lang-utils/syllable";
import { langEntryComparer } from "@/library/search/search";
import { trackHasBoth } from "@/composables/useTrack";

import Character from "../content/Character.vue";
import DoublePronunciation from "../content/DoublePronunciation.vue";
import ConstrainedPopover from "../common/ConstrainedPopover.vue";

const { pronunciation, char, entryIndices } = defineProps<{
  pronunciation: string; // in ipaRaw (may be illegal)
  char: string | null;
  entryIndices: number[]; // of FG entries
}>();

const { show } = syllableUtils.FG;
const pinyin = computed<string>(() =>
  show(pronunciation, "pinyin", undefined, "ipaRaw")
);

const TonesMap = syllableDataCache.get("tones").FG;
type Tone = keyof typeof TonesMap & string;

const entriesMap = computed<Partial<Record<Tone, LangEntry[]>>>(() => {
  if (char == null) {
    return {};
  }

  const entriesMap: Record<Tone, LangEntry[]> = Object.fromEntries(
    Object.keys(TonesMap).map((tone) => [tone, []])
  );

  const DICTIONARY = dictionaryCache.get("FG");
  entryIndices.forEach((index) => {
    const entry = DICTIONARY[index]!;
    const tone = entry.記錄讀音!.at(-1) as Tone;
    entriesMap[tone]!.push(entry);
  });

  Object.entries(entriesMap).forEach(([tone, entries]) => {
    if (entries.length === 0) {
      delete entriesMap[tone];
    } else {
      entries.sort(langEntryComparer);
    }
  });

  return entriesMap;
});

trackHasBoth();
</script>

<template>
  <template v-if="char && Object.keys(entriesMap).length > 0">
    <ConstrainedPopover>
      <template #trigger>
        <span
          ref="charNode"
          class="char clickable"
          :class="{ [char.at(-1)!]: char.includes('|') }"
        >
          {{ char[0] }}
        </span>
      </template>

      <div class="rhyme-table-popover grid-container">
        <template
          v-for="[tone, entries] of Object.entries(entriesMap)"
          :key="tone"
        >
          <div>
            {{ TonesMap[tone].name }}
            <DoublePronunciation :pronunciation="pinyin + tone" language="FG" />
          </div>
          <div style="max-width: 12em" :class="{ 輕: tone === '0' }">
            <template
              v-for="entry of entries"
              :key="entry.字頭 + entry.記錄讀音"
            >
              <span style="white-space: nowrap">
                <span :class="entry.層?.[0]">
                  <Character :character="entry.字頭 + ':' + pinyin + tone" />
                </span>
                <sub v-if="entry.層">
                  {{
                    "老新官".includes(entry.層[0]!)
                      ? entry.層.slice(1)
                      : entry.層
                  }}
                </sub>
              </span>
            </template>
          </div>
        </template>
      </div>
    </ConstrainedPopover>
  </template>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: 1em;
}
</style>

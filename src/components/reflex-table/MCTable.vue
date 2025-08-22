<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useHistoryStore } from "@/stores/history";
import { LANGUAGE_MAP, LANGUAGES } from "@/library/constants/language";
import { useDraggable } from "@/composables/useDraggable";

import Pronunciation from "../content/Pronunciation.vue";
import StickyTable from "../common/StickyTable.vue";

const settings = useSettingsStore();
const history = useHistoryStore();
const languages = toRef(history, "languages");

const { syllables } = defineProps<{ syllables: MCEntry[] }>();

const columns = computed<
  {
    title: string;
    key: string;
  }[]
>(() => [
  ...[
    {
      title: "例字",
      key: "char",
    },
    {
      title: "音韻地位",
      key: "MCInfo",
    },
  ],
  ...history.languages.map((language) => ({
    title: LANGUAGE_MAP[language],
    key: language,
  })),
]);

const rows = computed<Record<string, string>[]>(() =>
  syllables.map((syllable) => ({
    char: syllable.MC.字,
    MCInfo: syllable.MC.音韻地位(settings.orderingMCInfo),
    ...Object.fromEntries(
      history.languages.map((language) => [language, syllable[language]])
    ),
  }))
);

const header = ref<HTMLElement | null>(null);
useDraggable(header, [
  {
    ordering: languages,
    keyName: "language",
    draggable: ".language",
  },
]);
</script>

<template>
  <StickyTable>
    <thead>
      <tr ref="header">
        <th
          v-for="column of columns"
          :key="column.key"
          :language="column.key"
          :class="{ clickable: (LANGUAGES as string[]).includes(column.key) }"
        >
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) of rows" :key="index">
        <td
          v-for="(column, index) of columns"
          :key="index"
          :column-key="column.key"
          :class="{ 'align-left': column.key === 'MCInfo' }"
        >
          <template v-if="!(LANGUAGES as string[]).includes(column.key)">
            {{ row[column.key as keyof typeof row] }}
          </template>
          <template v-else>
            <Pronunciation
              :pronunciation="row[column.key]!"
              :language="column.key as Language"
            />
          </template>
        </td>
      </tr>
    </tbody>
  </StickyTable>
</template>

<style scoped>
.align-left {
  text-align: left;
}
</style>

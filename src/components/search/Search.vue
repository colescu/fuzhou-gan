<script setup lang="ts">
import { provide, toRefs, watch } from "vue";
import { useHistoryStore } from "@/stores/history";
import { createNestedTabRoutingFactory } from "@/composables/useTabRouting";
import { trackHasSearch } from "@/composables/useTrack";
import { LANGUAGE_MAP } from "@/library/constants/language";

import SearchChar from "./SearchChar.vue";
import SearchMC from "./SearchMC.vue";
import SearchLang from "./SearchLang.vue";
import SearchPM from "./SearchPM.vue";
import SearchGC from "./SearchGC.vue";
import SearchResults from "./SearchResults.vue";
import { NCard, NSpace, NTabPane, NTabs } from "naive-ui";

const history = useHistoryStore();
const { tab, searchLanguage, searchResults, page } = toRefs(history.search);

const { language = "FG" } = defineProps<{ language: Language }>();

function clear() {
  searchResults.value = null;
  page.value = 1;
}

function searchWrapper(search: () => number[] | Promise<number[]>) {
  return async () => {
    clear();
    searchLanguage.value = language;
    searchResults.value = await search();
  };
}

provide("searchWrapper", searchWrapper);

watch(
  () => language,
  () => {
    if (searchLanguage.value !== language) {
      clear();
    }
  },
  { immediate: true }
);

createNestedTabRoutingFactory().setupTabRouting({
  queryName: "tab",
  store: tab,
  tabs: ["char", "lang", "MC", "PM", "GC"],
});

trackHasSearch();

watch(page, () => {
  window.scrollTo({ top: 200 });
});
</script>

<template>
  <n-space vertical>
    <n-card>
      <n-tabs
        v-model:value="tab"
        @update:value="clear"
        type="line"
        size="large"
        animated
      >
        <n-tab-pane name="char" tab="依字">
          <SearchChar :language="language" />
        </n-tab-pane>
        <n-tab-pane name="Lang" :tab="`依${LANGUAGE_MAP[language]}`">
          <SearchLang :language="language" />
        </n-tab-pane>
        <n-tab-pane name="MC" tab="依中古漢語">
          <SearchMC :language="language" />
        </n-tab-pane>
        <n-tab-pane name="PM" tab="依普通話">
          <SearchPM :language="language" />
        </n-tab-pane>
        <n-tab-pane name="GC" tab="依廣州話">
          <SearchGC :language="language" />
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <SearchResults />
  </n-space>
</template>

<style scoped>
:deep(.char) {
  color: inherit !important;
}

:deep(.grid-form) {
  margin-top: 1em;
}

:deep(.n-form-item-gi) {
  min-width: 5em;
}

:deep(.search-input) {
  max-width: 95%;
}

:deep(.submit) {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

:deep(.center) {
  height: 100%;
}

:deep(.center) > .block {
  margin: auto -1.5em;
  height: 100%;
  box-sizing: border-box;
  border-top: 0.5px solid var(--dark-gray);
}
</style>

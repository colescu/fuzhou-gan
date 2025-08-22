<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useHistoryStore } from "@/stores/history";
import { dictionaryCache } from "@/library/data/core-data";
import { syllableUtils } from "@/library/lang-utils/syllable";
import { LANGUAGE_MAP } from "@/library/constants/language";

import Pronunciation from "../content/Pronunciation.vue";
import EntryBlock from "./EntryBlock.vue";
import { NSpace, NCard, NGrid, NGridItem, NPagination } from "naive-ui";

const history = useHistoryStore();
const {
  searchLanguage: language,
  searchResults,
  page,
} = toRefs(history.search);

const dictionary = computed(() => dictionaryCache.get(language.value));

const RESULTS_PER_PAGE = 20 as const;
const paginatedResults = computed<number[]>(() =>
  searchResults.value == null
    ? []
    : searchResults.value.slice(
        (page.value - 1) * RESULTS_PER_PAGE,
        page.value * RESULTS_PER_PAGE
      )
);

const searchResultsSet = computed<string[]>(() =>
  searchResults.value == null
    ? []
    : [
        ...new Set(
          searchResults.value.map((index) => dictionary.value[index]!.讀音)
        ),
      ].sort(syllableUtils[language.value].comparer("pinyin"))
);
</script>

<template>
  <n-card>
    <template v-if="searchResults == null" />
    <template v-else>
      <div>
        <template v-if="searchResults.length === 0"> 無結果 </template>
        <template v-else> 共查到 {{ searchResults.length }} 個字條 </template>
      </div>
      <div v-if="searchResults.length > 0" style="margin-top: 1em">
        <div style="display: inline-flex; flex-wrap: wrap">
          可能的{{ LANGUAGE_MAP[language] }}發音：
          <template
            v-for="(pronunciation, index) of searchResultsSet"
            :key="index"
          >
            <span style="white-space: nowrap">
              <Pronunciation
                :pronunciation="pronunciation"
                :language="language"
              />
              <span v-if="index < searchResultsSet.length - 1">,&nbsp;</span>
            </span>
          </template>
        </div>
      </div>

      <n-grid
        v-if="searchResults.length > 0"
        cols="1 600:2"
        style="margin-top: 2em"
      >
        <n-grid-item
          v-for="index of paginatedResults"
          :key="index"
          class="center"
        >
          <EntryBlock
            :key="index"
            :entry="dictionary[index]!"
            :language="language"
          />
        </n-grid-item>
      </n-grid>
      <n-space
        v-if="searchResults.length > RESULTS_PER_PAGE"
        justify="center"
        style="margin-top: 1.5em"
      >
        <n-pagination
          v-model:page="page"
          :page-size="RESULTS_PER_PAGE"
          :item-count="searchResults.length"
          simple
        />
      </n-space>
    </template>
  </n-card>
</template>

<style scoped></style>

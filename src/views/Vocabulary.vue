<script setup lang="ts">
import { toRef } from "vue";
import { useCacheStore } from "../stores/cache";

import { NTabs, NTabPane } from "naive-ui";
import Sentences from "../content/corpus/sentences.md";

const cache = useCacheStore();

export type VocabularyTab = "characters" | "words" | "sentences";
const activeTab = toRef(cache.vocabulary, "vocabulary");
</script>

<template>
  <n-tabs
    v-model:value="activeTab"
    default-value="characters"
    type="line"
    animated
  >
    <n-tab-pane name="characters" tab="方言字">
      <!-- TODO -->
      待施工
    </n-tab-pane>
    <n-tab-pane name="words" tab="特色用詞">
      <!-- TODO -->
      待施工
    </n-tab-pane>
    <n-tab-pane name="sentences" tab="句子">
      <Sentences />
    </n-tab-pane>
  </n-tabs>
</template>

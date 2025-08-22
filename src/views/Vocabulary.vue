<script setup lang="ts">
import { toRefs } from "vue";
import { useHistoryStore } from "../stores/history";
import { createNestedTabRoutingFactory } from "@/composables/useTabRouting";

import { NTabs, NTabPane } from "naive-ui";

import RandomCharacter from "./RandomCharacter.vue";

import Sentences from "../content/corpus/sentences.md";
import Poems from "../content/corpus/poems.md";
import Articles from "../content/corpus/articles.md";

const history = useHistoryStore();
const { tab, corpusSubtab } = toRefs(history.vocabulary);

const tabNode = {
  queryName: "tab1",
  store: tab,
  tabs: ["characters", "words", "corpus"],
};
const corpusNode = {
  queryName: "corpus-subtab",
  store: corpusSubtab,
  tabs: ["sentences", "poems", "articles"],
  parent: tabNode,
  parentValue: "corpus",
};

const factory = createNestedTabRoutingFactory();
factory.setupTabRouting(tabNode);
factory.setupTabRouting(corpusNode);
</script>

<template>
  <div>
    <div>施工中…</div>

    <n-tabs v-model:value="tab" type="line" size="large" animated>
      <n-tab-pane name="characters" tab="方言字">
        <RandomCharacter />
      </n-tab-pane>

      <n-tab-pane name="words" tab="特色詞"> </n-tab-pane>

      <n-tab-pane name="corpus" tab="例文" class="corpus">
        <n-tabs v-model:value="corpusSubtab" type="card" size="small" animated>
          <n-tab-pane name="sentences" tab="例句">
            <Sentences />
          </n-tab-pane>
          <n-tab-pane name="poems" tab="詩詞">
            <Poems />
          </n-tab-pane>
          <n-tab-pane name="articles" tab="奇文">
            <Articles />
          </n-tab-pane>
        </n-tabs>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped>
.todo {
  margin-bottom: 1.5em;
}

:deep(.char) {
  color: var(--text-color) !important;
}

.corpus :deep(.pinyin, .ipa) {
  font-size: 14px !important;
}
</style>

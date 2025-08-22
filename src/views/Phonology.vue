<script setup lang="ts">
import { toRefs, type Component } from "vue";
import { useHistoryStore } from "../stores/history";
import { createNestedTabRoutingFactory } from "@/composables/useTabRouting";
import { fromEntriesConst } from "@/library/common/object";
import { LANGUAGE_MAP, LANGUAGES } from "../library/constants/language";

import Initial from "../content/phonetics/initial.md";
import Final from "../content/phonetics/final.md";
import Tone from "../content/phonetics/tone.md";
import Variations from "../content/phonetics/variations.md";
import RhymeTable from "@/components/rhyme-table/RhymeTableTab.vue";

import Characteristics from "../content/learn/characteristics.md";
import Strata from "../content/learn/strata.md";
import Mispronounceable from "../content/learn/mispronounceable.md";

import Predict from "@/components/reflex-table/Predict.vue";

import { NTabs, NTabPane } from "naive-ui";

const modules = import.meta.glob(`../content/compare/*.md`, {
  eager: true,
}) as Record<string, { default: Component }>;
const LANGUAGE_COMPONENTS = fromEntriesConst(
  (["PM"] as const).map((language) => [
    language,
    modules[`../content/compare/${language}.md`]!.default,
  ])
);

const history = useHistoryStore();
const { tab, phoneticsSubtab, learnSubtab } = toRefs(history.phonology);

const tabNode = {
  queryName: "tab",
  store: tab,
  tabs: ["phonetics", "learn", "prediction"],
};
const phoneticsNode = {
  queryName: "phonetics-subtab",
  store: phoneticsSubtab,
  tabs: ["initial", "final", "tone", "variations", "rhyme-table"],
  parent: tabNode,
  parentValue: "phonetics",
};
const learnNode = {
  queryName: "learn-subtab",
  store: learnSubtab,
  tabs: ["characteristics", "mispronounceable", "strata", ...LANGUAGES],
  parent: tabNode,
  parentValue: "learn",
};

const factory = createNestedTabRoutingFactory();
factory.setupTabRouting(tabNode);
factory.setupTabRouting(phoneticsNode);
factory.setupTabRouting(learnNode);
</script>

<template>
  <n-tabs v-model:value="tab" type="line" size="large" animated>
    <n-tab-pane name="phonetics" tab="聲韻調與拼音">
      <n-tabs v-model:value="phoneticsSubtab" type="card" size="small" animated>
        <n-tab-pane name="initial" tab="聲母">
          <Initial />
        </n-tab-pane>
        <n-tab-pane name="final" tab="韻母">
          <Final />
        </n-tab-pane>
        <n-tab-pane name="tone" tab="聲調">
          <Tone />
        </n-tab-pane>
        <n-tab-pane name="rhyme-table" tab="韻圖">
          <RhymeTable />
        </n-tab-pane>
        <!-- TODO 語音學細節
         元音舌位圖
         調值圖
         輕聲調值
         -->
        <n-tab-pane name="variations" tab="變體">
          <Variations />
        </n-tab-pane>
      </n-tabs>
    </n-tab-pane>

    <n-tab-pane name="learn" tab="學話撫州話">
      <n-tabs v-model:value="learnSubtab" type="card" size="small" animated>
        <n-tab-pane name="characteristics" tab="音韻特徵">
          <Characteristics />
        </n-tab-pane>
        <n-tab-pane name="strata" tab="文白異讀">
          <Strata />
        </n-tab-pane>
        <!-- <n-tab-pane name="mispronounceable" tab="易錯字">
          <Mispronounceable />
        </n-tab-pane> -->
        <n-tab-pane
          v-for="(component, language) in LANGUAGE_COMPONENTS"
          :key="language"
          :name="language"
          :tab="`對應${LANGUAGE_MAP[language]}`"
        >
          <component :is="component" />
        </n-tab-pane>
      </n-tabs>

      <Teleport to="#help">
        「≈」表示僅聲調不同。<br />
        default
      </Teleport>
    </n-tab-pane>

    <n-tab-pane name="prediction" tab="推導器">
      <Predict />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>
:deep(.before-main) {
  margin-bottom: 1.5em;
}
</style>

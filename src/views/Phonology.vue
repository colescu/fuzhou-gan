<script setup lang="ts">
import { toRef } from "vue";
import { useCacheStore } from "../stores/cache";

import { NTabs, NTabPane } from "naive-ui";
import Initial from "../content/fg-phonology/initial.md";
import Rhyme from "../content/fg-phonology/rhyme.md";
import Tone from "../content/fg-phonology/tone.md";
import Characteristics from "../content/fg-historical-phonology/characteristics.md";
import Prediction from "../content/fg-historical-phonology/prediction.md";
import PM from "../content/fg-comparative-phonology/PM.md";
import GC from "../content/fg-comparative-phonology/GC.md";

const cache = useCacheStore();

export type PhonologyTab = "FG" | "MC" | "other";
const activeTab = toRef(cache.phonology, "phonology");
export type PhonologyFGTab = "initial" | "rhyme" | "tone";
const activeFGTab = toRef(cache.phonology, "FG");
export type PhonologyMCTab = "characteristics" | "prediction";
const activeMCTab = toRef(cache.phonology, "MC");
export type PhonologyOtherTab = "PM";
const activeOtherTab = toRef(cache.phonology, "other");
</script>

<template>
  <n-tabs v-model:value="activeTab" type="line" animated>
    <n-tab-pane name="FG" tab="聲韻調與拼音">
      <div style="margin-bottom: 1.5em">
        <p>撫州話有一千二百餘個音節（不計聲調則約五百）。</p>
      </div>
      <n-tabs v-model:value="activeFGTab" type="card" animated>
        <n-tab-pane name="initial" tab="聲母">
          <Initial />
        </n-tab-pane>
        <n-tab-pane name="rhyme" tab="韻母">
          <Rhyme />
        </n-tab-pane>
        <n-tab-pane name="tone" tab="聲調">
          <Tone />
        </n-tab-pane>
      </n-tabs>
    </n-tab-pane>

    <n-tab-pane name="MC" tab="對應中古音">
      <div style="height: 0.5em"></div>
      <n-tabs v-model:value="activeMCTab" type="card" animated>
        <n-tab-pane name="characteristics" tab="音韻特徵">
          <Characteristics />
        </n-tab-pane>
        <n-tab-pane name="prediction" tab="推導規則">
          <Prediction />
        </n-tab-pane>
      </n-tabs>
    </n-tab-pane>

    <n-tab-pane name="other" tab="對應其他方言">
      <div style="height: 0.5em"></div>
      <n-tabs v-model:value="activeOtherTab" type="card" animated>
        <n-tab-pane name="PM" tab="普通話">
          <PM />
        </n-tab-pane>
        <n-tab-pane name="GC" tab="廣州話">
          <GC />
        </n-tab-pane>
      </n-tabs>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>
:deep(.example-table td:last-child) {
  text-align: left;
}
</style>

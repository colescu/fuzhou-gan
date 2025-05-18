<script setup lang="ts">
import { NCard, NTabs, NTabPane } from "naive-ui";
import Initial from "../content/FGPhonology/initial.md";
import Rhyme from "../content/FGPhonology/rhyme.md";
import Tone from "../content/FGPhonology/tone.md";
</script>

<template>
  <n-card>
    <n-tabs type="line" animated>
      <n-tab-pane name="FG" tab="聲韻調與拼音">
        <br />
        <n-tabs type="card" placement="left" animated>
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

      <n-tab-pane name="MC" tab="對應中古音"> TODO </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style scoped>
::v-deep table td:last-child {
  text-align: left;
}
</style>

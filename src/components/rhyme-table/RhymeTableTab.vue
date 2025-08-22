<script setup lang="ts">
import { defineAsyncComponent } from "vue";

import RhymeTableSettings from "./RhymeTableSettings.vue";
import SuspenseWrapper from "../wrapper/SuspenseWrapper.vue";
const RhymeTableView = defineAsyncComponent(() => import("./RhymeTable.vue"));
</script>

<template>
  <div class="before-main">
    <p>撫州話共計<strong>約五百個音節</strong>（不計聲調）。</p>
  </div>

  <RhymeTableSettings />

  <SuspenseWrapper>
    <RhymeTableView />
  </SuspenseWrapper>

  <Teleport to="#help">
    韻母依字典序排列，可拖動調整各部分的優先級。<br />
    點擊韻圖中的單元格可查看該音節的所有收錄字。
  </Teleport>
</template>

<style scoped></style>

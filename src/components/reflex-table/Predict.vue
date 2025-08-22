<script setup lang="ts">
import { toRef } from "vue";
import { useHistoryStore } from "@/stores/history";
import { defineAsyncComponent } from "vue";

import PredictForm from "./PredictForm.vue";
import SuspenseWrapper from "../wrapper/SuspenseWrapper.vue";
const ReflexTable = defineAsyncComponent(
  () => import("@/components/reflex-table/ReflexTable.vue")
);

const history = useHistoryStore();
const savedForm = toRef(history.phonology, "predictForm");
</script>

<template>
  <PredictForm />

  <SuspenseWrapper v-if="savedForm != null">
    <ReflexTable v-bind="savedForm" />
  </SuspenseWrapper>

  <Teleport to="#help">
    該推導器比較的是理論推導音，無視例外。<br />
    推導普通話、廣州話的數據來自
    <a
      href="https://en.wiktionary.org/wiki/Module:ltc-pron/predict"
      target="_blank"
      rel="noopener noreferrer"
      >Wiktionary</a
    >。<br />
    推導上海話的數據來自
    <a
      href="https://zhuanlan.zhihu.com/p/386456940"
      target="_blank"
      rel="noopener noreferrer"
      >Nyoeghau</a
    >。<br />
    其餘推導數據爲筆者本人整理。<br />
    推導撫州話的規則見
    <a
      href="https://raw.githubusercontent.com/colescu/fuzhou-gan-backend/refs/heads/main/src/%E6%8E%A8%E5%B0%8E%E6%92%AB%E5%B7%9E%E8%A9%B1.py"
      target="_blank"
      rel="noopener noreferrer"
      >Python 脚本</a
    >。<br />
    可拖動標題行以調整列的順序。<br />
    點擊單元格內的項可查看對應的廣韻小韻表。
  </Teleport>
</template>

<style scoped></style>

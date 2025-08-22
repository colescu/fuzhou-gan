<script setup lang="ts">
import { toRef } from "vue";
import { useHistoryStore } from "@/stores/history";
import { entriesConst } from "@/library/common/object";

import Sortable from "../common/Sortable.vue";
import {
  NCard,
  NSpace,
  NTag,
  NButton,
  NCheckbox,
  NGrid,
  NGridItem,
} from "naive-ui";

const history = useHistoryStore();
const orderingParts = toRef(history, "orderingParts");

const strataMap = {
  輕: "輕聲字",
  老: "老派音",
  新: "新派音",
  官: "普化音",
} as const;
</script>

<template>
  <n-card class="card">
    <n-space vertical :style="{ gap: '1em' }">
      <n-space align="center">
        <n-tag>韻母排序</n-tag>
        <Sortable v-model="orderingParts" v-slot="{ item }">
          <n-button
            :key="item"
            size="small"
            style="cursor: grab"
            native-focus-behavior
          >
            {{ item }}
          </n-button>
        </Sortable>
      </n-space>
      <n-space align="center">
        <n-tag>篩選分層</n-tag>
        <n-grid cols="2" :x-gap="4" :y-gap="4">
          <n-grid-item
            v-for="[label, name] of entriesConst(strataMap)"
            :key="label"
            class="center"
          >
            <n-checkbox v-model:checked="history.phonology.rhymeTable[label]">
              <span :class="label">{{ name }}</span>
            </n-checkbox>
          </n-grid-item>
        </n-grid>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped></style>

<script setup lang="ts">
import { toRef } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { mcCache } from "@/library/data/core-data";

import { NSpace, NTag, NCheckbox } from "naive-ui";
import Sortable from "@/components/common/Sortable.vue";

const settings = useSettingsStore();

const orderingMCInfo = toRef(settings, "orderingMCInfo");

const exampleMC = mcCache.get()[128]!.MC;
</script>

<template>
  <n-space
    style="margin: 2em auto; padding-top: 2em; max-width: fit-content"
    vertical
  >
    <n-space align="center">
      <n-tag>例字</n-tag>
      <n-checkbox v-model:checked="settings.colorizeChar">
        <span class="char">突出顏色</span>
      </n-checkbox>
    </n-space>
    <n-space align="center">
      <n-tag>音韻地位格式</n-tag>
      <Sortable v-model="orderingMCInfo" v-slot="{ item }">
        <ruby class="under clickable" style="padding: 0 0.2em">
          <rb style="font-size: 1.2em">
            {{ exampleMC[item as keyof typeof exampleMC] }}
          </rb>
          <rt>{{ item }}</rt>
        </ruby>
      </Sortable>
    </n-space>
  </n-space>
</template>

<style scoped></style>

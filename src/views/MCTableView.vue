<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { mcCache } from "@/library/data/core-data";
import {
  getFeature,
  type ValidFeatureKey,
} from "@/library/reflex-table/form-predict";
import { LANGUAGE_MAP } from "../library/constants/language";

import MCTable from "../components/reflex-table/MCTable.vue";
import { partsUtils } from "@/library/lang-utils/parts";

const route = useRoute();

type Condition = ValidFeatureKey & { value: string };
const conditions: Condition[] = JSON.parse(route.query.condition as string);

const syllables = computed<MCEntry[]>(() =>
  Object.values(mcCache.get()).filter((entry) =>
    conditions.every(
      (condition) => getFeature(condition).getter(entry) === condition.value
    )
  )
);

function displayCondition(condition: Condition): string {
  const { language } = condition;
  let value = condition.value;

  if (language !== "MC") {
    const { show } = partsUtils[condition.language];
    value = show(value, condition.field, "ipaRaw");
  }

  return [
    language === "MC" ? "中古" : LANGUAGE_MAP[language],
    getFeature(condition).label,
    ` <span class="operator">=</span> `,
    value ?? "Ø",
  ].join("");
}
</script>

<template>
  <div>
    <div
      v-for="condition of conditions"
      class="title"
      v-html="displayCondition(condition)"
    />

    <MCTable :syllables="syllables" />

    <Teleport to="#help"> 讀音均爲推導音。 </Teleport>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.2em;
  text-align: center;
}
</style>

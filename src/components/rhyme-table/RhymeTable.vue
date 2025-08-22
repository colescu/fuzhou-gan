<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useHistoryStore } from "@/stores/history";
import { dictionaryCache } from "@/library/data/core-data";
import { syllableUtils } from "@/library/lang-utils/syllable";
import {
  getPart,
  partsUtils,
  renderPartsLabel,
} from "@/library/lang-utils/parts";
import data from "@/library/constants/rhyme-table.json";

import StickyTable from "../common/StickyTable.vue";
import RhymeTableCell from "./RhymeTableCell.vue";

const settings = useSettingsStore();
const history = useHistoryStore();

const { parse } = syllableUtils.FG;
const { show, comparer } = partsUtils.FG;

function showPart(value: string, part: "聲母" | "韻母"): string {
  return renderPartsLabel(show(value, part, settings.format), settings.format);
}

const table: Record<string, Record<string, string | null>> = data;
const initials = [
  "",
  ...Object.keys(table)
    .filter((initial) => initial != "")
    .sort(comparer("聲母")),
];
const zeroFinal = JSON.stringify(["", "", ""]);
const finals = computed(() => [
  ...Object.keys(table[""]!)
    .filter((final) => final != zeroFinal)
    .sort(comparer("韻母", history.orderingParts)),
  zeroFinal,
]);

// precompute once for all cells
const entriesIndicesMap = computed<Record<string, Record<string, number[]>>>(
  () => {
    const result = Object.fromEntries(
      initials.map((initial) => [
        initial,
        Object.fromEntries(
          finals.value.map((final) => [final, [] as number[]])
        ),
      ])
    );

    dictionaryCache.get("FG").forEach((entry, index) => {
      if (
        (entry.訓作 != null && entry.訓作 !== "？") ||
        entry.記錄讀音 == null
      ) {
        return;
      }

      for (const [stratum, included] of Object.entries(
        history.phonology.rhymeTable
      )) {
        if (
          !included &&
          (stratum === "輕"
            ? entry.記錄讀音.at(-1) === "0"
            : entry.層?.[0] === stratum)
        ) {
          return;
        }
      }

      const syllable = parse(entry.記錄讀音);
      result[syllable.聲母]![getPart(syllable, "韻母")]!.push(index);
    });

    return result;
  }
);
</script>

<template>
  <StickyTable>
    <thead>
      <tr>
        <th></th>
        <th
          v-for="initial of initials"
          :key="initial"
          v-html="initial === '' ? '零' : showPart(initial, '聲母')"
          style="width: 1.3em"
        />
      </tr>
    </thead>
    <tbody>
      <tr v-for="final of finals" :key="final">
        <th v-html="final === zeroFinal ? '零' : showPart(final, '韻母')" />
        <td v-for="initial of initials" :key="initial">
          <RhymeTableCell
            :pronunciation="initial + JSON.parse(final).join('')"
            :char="table[initial]?.[final] ?? null"
            :entry-indices="entriesIndicesMap[initial]![final]!"
          />
        </td>
      </tr>
    </tbody>
  </StickyTable>
</template>

<style scoped>
table {
  white-space: nowrap;
  table-layout: fixed;
}
</style>

<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { useSettingsStore } from "@/stores/settings";
import { useHistoryStore } from "@/stores/history";
import { partsUtils, renderPartsLabel } from "@/library/lang-utils/parts";
import { Relator, type ColumnData } from "@/library/reflex-table/relator";
import {
  getFeature,
  type Feature,
  type ValidFeatureKey,
  type ValidPredictForm,
} from "@/library/reflex-table/form-predict";
// import { commentator } from "@/library/reflex-table/commentator";
import { cartesianProduct, fromEntriesConst } from "@/library/common/object";
import { computeRowSpan } from "@/library/dom/compute";
import { LANGUAGE_MAP, LANGUAGES } from "@/library/constants/language";
import { useDraggable } from "@/composables/useDraggable";

import Possibility from "./Possibility.vue";
import StickyTable from "../common/StickyTable.vue";

const router = useRouter();
const settings = useSettingsStore();

const history = useHistoryStore();
const languages = toRef(history, "languages");

const form = defineProps<ValidPredictForm>();
const Xs = toRef(form, "Xs");

const featureXs = computed<Feature[]>(() => form.Xs.map(getFeature));
const featureYs = computed<["MC" | Language, Feature][]>(() =>
  form.Y.language === "lang"
    ? LANGUAGES.map((language) => [
        language,
        getFeature({ ...form.Y, language } as ValidFeatureKey),
      ])
    : [[form.Y.language, getFeature(form.Y)]]
);

const tableData = computed<Partial<Record<"MC" | Language, ColumnData>>>(() =>
  fromEntriesConst(
    featureYs.value.map(([language, featureY]) => [
      language,
      new Relator(
        (entry: MCEntry) =>
          JSON.stringify(
            featureXs.value.map((featureX) => featureX.getter(entry))
          ),
        featureY.getter,
        (x, y) => ""
        // commentator(form.X, { ...form.Y, language } as GetterKey)
      ).columnData,
    ])
  )
);

const rows = computed<string[][]>(() => {
  const allValues = cartesianProduct(
    ...featureXs.value.map((featureX) => featureX.values)
  );
  const validValueSet = new Set(
    Object.keys(Object.values(tableData.value)[0]!)
  );
  return allValues.filter((value) => validValueSet.has(JSON.stringify(value)));
});
const rowspans = computed(() => computeRowSpan(rows.value));

const columns = computed<{ key: "MC" | Language; label: string }[]>(() => {
  if (form.Y.language === "MC") {
    return [{ key: "MC", label: "中古漢語" }];
  } else {
    return (
      form.Y.language === "lang" ? history.languages : [form.Y.language]
    ).map((language) => ({
      key: language,
      label: LANGUAGE_MAP[language],
    }));
  }
});

function showPossibility(
  value: string,
  { language, field }: ValidFeatureKey
): string {
  if (language === "MC") {
    return value;
  } else {
    const { show } = partsUtils[language];
    return renderPartsLabel(
      show(value, field, settings.format),
      settings.format
    );
  }
}

function hashFeatureKey(featureKey: ValidFeatureKey): string {
  return featureKey.field + featureKey.language;
}

function getTableUrl(
  xs: string[],
  y: string,
  languageY: "MC" | Language
): string {
  return router.resolve({
    path: "/mc-table",
    query: {
      condition: JSON.stringify([
        ...form.Xs.map((featureKeyX, index) => ({
          ...featureKeyX,
          value: xs[index],
        })),
        {
          language: languageY,
          field: form.Y.field,
          value: y,
        },
      ]),
    },
  }).href;
}

const header = ref<HTMLElement | null>(null);
useDraggable(header, [
  {
    ordering: Xs,
    keyName: "x",
    keyGetter: hashFeatureKey,
    draggable: ".x",
  },
  {
    ordering: languages,
    keyName: "language",
    draggable: ".language",
  },
]);
</script>

<template>
  <StickyTable v-if="rows.length <= 300" :n="form.Xs.length">
    <thead>
      <tr ref="header">
        <th
          v-for="(featureKeyX, index) of form.Xs"
          :key="hashFeatureKey(featureKeyX)"
          group="x"
          :x="hashFeatureKey(featureKeyX)"
          :class="form.Xs.length > 1 ? ['x', 'clickable'] : []"
        >
          {{
            featureKeyX.language === "MC"
              ? "中古"
              : LANGUAGE_MAP[featureKeyX.language]
          }}<br />
          {{ featureXs[index]!.label }}
        </th>
        <th
          v-for="column of columns"
          :key="column.key"
          group="language"
          :language="column.key"
          :class="(LANGUAGES as string[]).includes(column.key) ? ['language', 'clickable'] : []"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(xs, rowIndex) of rows">
        <template v-for="(rowspan, index) of rowspans[rowIndex]">
          <th
            v-if="rowspan > 0"
            :key="index"
            :rowspan="rowspan"
            v-html="showPossibility(xs[index]!, form.Xs[index]!) || '無'"
          />
        </template>
        <td
          v-for="column of columns"
          :key="column.key"
          :column-key="column.key"
        >
          <Possibility
            v-for="(possibility, index) of tableData[column.key]![JSON.stringify(xs)]"
            :key="index"
            :possibility="{
                ...possibility,
                value: showPossibility(possibility.value, {
                  ...form.Y,
                  language: column.key,
                } as ValidFeatureKey),
                }
            "
            :table-url="getTableUrl(xs, possibility.value, column.key)"
          />
        </td>
      </tr>
    </tbody>
  </StickyTable>
  <div v-else class="center" style="margin: 2em auto">
    表格過大，請減少自變量的可能取值數。
    <!-- TODO show only part of table -->
  </div>
</template>

<style scoped>
td {
  max-width: 8em;
}
</style>

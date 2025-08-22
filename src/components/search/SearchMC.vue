<script setup lang="ts">
import { computed, inject, reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { getFormMCUtils } from "@/library/search/form-mc";
import { getSearchResultsByFilter } from "@/library/search/search";

import MultipleSelect from "../common/MultipleSelect.vue";
import { NButton, NForm, NFormItemGi, NGrid } from "naive-ui";

const settings = useSettingsStore();

const { language = "FG" } = defineProps<{ language: Language }>();
const searchWrapper = inject("searchWrapper") as any;

const FormMCUtils = getFormMCUtils();
const formMC = reactive(FormMCUtils.EMPTY_FORM);
const optionsMC = computed(() => FormMCUtils.computeOptions(formMC));

const searchMC = searchWrapper(() =>
  getSearchResultsByFilter(
    (entry) => {
      const checker = FormMCUtils.getChecker(formMC);
      return entry?.MC != null && checker(entry.MC);
    },
    language,
    settings.includePredicted
  )
);
</script>

<template>
  <n-form class="grid-form" :model="formMC" @submit.prevent="searchMC">
    <n-grid cols="2 600:4" :x-gap="24">
      <n-form-item-gi
        v-for="item of FormMCUtils.ITEMS"
        :key="item"
        :label-props="{ for: item }"
        :label="item"
        :path="item"
      >
        <MultipleSelect
          :id="item"
          v-model="formMC[item]"
          :options="optionsMC[item]"
          :getLabel="
            (value) => (item === '呼' && value === '' ? '不分開合' : value)
          "
          select-all
        />
      </n-form-item-gi>
      <n-form-item-gi offset="0 600:2" class="submit">
        <n-button attr-type="submit" type="primary"> 查詢 </n-button>
      </n-form-item-gi>
    </n-grid>
  </n-form>

  <Teleport to="#help">
    過濾欄各項爲「且」關係。<br />
    如需更精細的查詢，請直接用 SQL 查詢<a
      href="https://github.com/colescu/fuzhou-gan-backend/blob/main/data/%E6%92%AB%E5%B7%9E%E8%A9%B1.sqlite3"
      target="_blank"
      rel="noopener noreferrer"
      >數據庫</a
    >。
  </Teleport>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useCacheStore } from "../stores/cache";
import EntryUtils from "../lib/entryUtils";
import { FGUtils, FormFGUtils, type FormFG } from "../lib/FGSyllable";
import { FormMCUtils, type FormMC } from "../lib/MCSyllable";

import EntryBlock from "../components/EntryBlock.vue";
import {
  NSpace,
  NCard,
  NTabs,
  NTabPane,
  NInput,
  NButton,
  NForm,
  NFormItem,
  NFormItemGi,
  NGrid,
  NPagination,
} from "naive-ui";
import MultipleSelect from "../components/MultipleSelect.vue";

const settings = useSettingsStore();
const cache = useCacheStore();

const searchResults = ref<Entry[]>([]);
const searchInfo = ref<string>("");

const page = ref(1);
const ResultsPerPage = 20;
const paginatedResults = computed<Entry[]>(() =>
  searchResults.value.slice(
    (page.value - 1) * ResultsPerPage,
    page.value * ResultsPerPage - 1
  )
);

function clearResults(): void {
  searchResults.value = [];
  searchInfo.value = "";
  page.value = 1;
}

function setSearchInfo(): void {
  searchInfo.value =
    searchResults.value.length === 0
      ? "無結果"
      : `共查到 ${searchResults.value.length} 個字條`;
}

const formChar = ref<string>("");
function searchChar(): void {
  clearResults();
  searchResults.value = [
    ...new Set(
      formChar.value
        .split("")
        .map((char) => EntryUtils.getEntries(char, settings.includePredicted))
        .flat()
    ),
  ];
  setSearchInfo();
}

const formMC = reactive<FormMC>(FormMCUtils.getEmptyForm());
const optionsMC = computed<FormMC>(() => FormMCUtils.computeOptions(formMC));
function searchMC(formMC: FormMC): void {
  clearResults();
  const checker = FormMCUtils.getChecker(formMC);
  searchResults.value = window.DICTIONARY.filter(
    (entry) =>
      (settings.includePredicted || !EntryUtils.isPredicted(entry)) &&
      checker(entry)
  );
  setSearchInfo();
}

const formFG = reactive<FormFG>(FormFGUtils.getEmptyForm());
const optionsFG = computed<FormFG>(() => FormFGUtils.computeOptions(formFG));
function searchFG(formFG: FormFG): void {
  clearResults();
  const checker = FormFGUtils.getChecker(formFG);
  searchResults.value = window.DICTIONARY.filter(
    (entry) =>
      (settings.includePredicted || !EntryUtils.isPredicted(entry)) &&
      checker(entry)
  );
  setSearchInfo();
}

export type SearchTab = "char" | "MC" | "FG" | "PM" | "GC";
const activeTab = toRef(cache.search, "tab");
</script>

<template>
  <n-space vertical>
    <n-card>
      <n-tabs
        type="line"
        v-model:value="activeTab"
        default-value="char"
        @update:value="clearResults"
        animated
      >
        <n-tab-pane name="char" tab="依字">
          <n-space align="center">
            <n-form inline style="max-width: 95%" @submit.prevent="searchChar">
              <n-form-item>
                <n-input
                  v-model:value="formChar"
                  placeholder="請輸入漢字"
                  clearable
                />
              </n-form-item>
              <n-form-item>
                <n-button attr-type="submit" type="primary"> 查找 </n-button>
              </n-form-item>
            </n-form>
          </n-space>
        </n-tab-pane>

        <n-tab-pane name="MC" tab="依中古漢語">
          <n-form inline :model="formMC" @submit.prevent="searchMC(formMC)">
            <n-grid cols="2 600:4" :x-gap="24">
              <n-form-item-gi
                v-for="item of FormMCUtils.ITEMS"
                :label="item"
                :path="item"
              >
                <MultipleSelect
                  v-model="formMC[item]"
                  :options="optionsMC[item]"
                  :getLabel="
                    (value) =>
                      item === '呼' && value === '' ? '不分開合' : value
                  "
                  :all="true"
                />
              </n-form-item-gi>
              <n-form-item-gi
                offset="0 600:2"
                style="
                  display: flex;
                  align-items: flex-end;
                  justify-content: flex-end;
                "
              >
                <n-button attr-type="submit" type="primary"> 查找 </n-button>
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="FG" tab="依撫州話">
          <n-form inline :model="formFG" @submit.prevent="searchFG(formFG)">
            <n-grid cols="2 600:4" :x-gap="24">
              <n-form-item-gi
                v-for="item of FormFGUtils.ITEMS"
                :label="item"
                :path="item"
              >
                <MultipleSelect
                  v-model="formFG[item]"
                  :options="optionsFG[item]"
                  :getLabel="
                    FormFGUtils.getOptionLabel!(item, settings.phoneticAlphabet)
                  "
                  :all="true"
                />
              </n-form-item-gi>
              <n-form-item-gi
                offset="0 600:2"
                style="
                  display: flex;
                  align-items: flex-end;
                  justify-content: flex-end;
                "
              >
                <n-button attr-type="submit" type="primary"> 查找 </n-button>
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-tab-pane>

        <!-- <n-tab-pane name="PM" tab="依普通話"> TODO </n-tab-pane>

        <n-tab-pane name="GC" tab="依廣州話"> TODO </n-tab-pane> -->
      </n-tabs>
    </n-card>

    <n-card>
      <div v-if="searchInfo" v-html="searchInfo" style="margin-bottom: 1em" />
      <div
        v-if="activeTab !== 'char' && searchResults.length > 0"
        style="margin-bottom: 2em"
      >
        可能的撫州話發音：<span :class="settings.phoneticAlphabet">
          {{
            [
              ...new Set(
                searchResults.map((entry) =>
                  FGUtils.showPronunciation(EntryUtils.getFG(entry), settings)
                )
              ),
            ].join(", ")
          }}
        </span>
      </div>
      <div v-if="searchResults.length > 0" id="output">
        <EntryBlock v-for="entry of paginatedResults" :entry="entry" />
      </div>
      <n-space
        v-if="searchResults.length > ResultsPerPage"
        justify="center"
        style="margin-top: 1em"
      >
        <n-pagination
          v-model:page="page"
          :page-size="ResultsPerPage"
          :item-count="searchResults.length"
          simple
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<style scoped>
.n-form-item-gi {
  min-width: 5em;
}
</style>

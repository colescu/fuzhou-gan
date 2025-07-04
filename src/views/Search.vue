<script setup lang="ts">
import { computed, reactive, ref, toRef } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useCacheStore } from "../stores/cache";
import EntryUtils from "../library/entryUtils";
import { FormFGUtils, type FormFG } from "../library/FGSyllable";
import { FormMCUtils, type FormMC } from "../library/MCSyllable";
import { fetchCharsByGC, fetchCharsByPM } from "../library/fetchChars";

import Pronunciation from "../components/Pronunciation.vue";
import MultipleSelect from "../components/MultipleSelect.vue";
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
  useMessage,
} from "naive-ui";

const settings = useSettingsStore();
const cache = useCacheStore();
const message = useMessage();

const searchResults = ref<Entry[]>([]);
const resultsSet = computed<Set<string>>(
  () =>
    new Set(
      searchResults.value.map((entry) => EntryUtils.getFGPronunciation(entry))
    )
);

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

function wrapper(search: () => void) {
  return async () => {
    clearResults();
    await search();
    setSearchInfo();
  };
}

function getEntries(chars: string[]): Entry[] {
  return [
    ...new Set(
      chars
        .map((char) => EntryUtils.getEntries(char, settings.includePredicted))
        .flat()
    ),
  ];
}

const formChar = ref<string>("");
const searchChar = wrapper(() => {
  searchResults.value = getEntries(formChar.value.split(""));
});

const formMC = reactive<FormMC>(FormMCUtils.getEmptyForm());
const optionsMC = computed<FormMC>(() => FormMCUtils.computeOptions(formMC));
const searchMC = wrapper(() => {
  const checker = FormMCUtils.getChecker(formMC);
  searchResults.value = window.DICTIONARY.filter(
    (entry) =>
      (settings.includePredicted || !EntryUtils.isPredicted(entry)) &&
      checker(entry)
  );
});

const formFG = reactive<FormFG>(FormFGUtils.getEmptyForm());
const optionsFG = computed<FormFG>(() => FormFGUtils.computeOptions(formFG));
const searchFG = wrapper(() => {
  const checker = FormFGUtils.getChecker(formFG);
  searchResults.value = window.DICTIONARY.filter(
    (entry) =>
      (settings.includePredicted || !EntryUtils.isPredicted(entry)) &&
      checker(entry)
  );
});

const formPM = ref<string>("");
const searchPM = wrapper(async () => {
  try {
    const chars = await fetchCharsByPM(formPM.value);
    searchResults.value = getEntries(chars);
  } catch (error) {
    console.error("Error fetching the Putonghua dictionary:", error);
    message.error("錯誤：未能獲取普通話字典！");
  }
});

const formGC = ref<string>("");
const searchGC = wrapper(async () => {
  try {
    const chars = await fetchCharsByGC(formGC.value);
    searchResults.value = getEntries(chars);
  } catch (error) {
    console.error("Error fetching the Cantonese dictionary:", error);
    message.error("錯誤：未能獲取廣州話字典！");
  }
});

export type SearchTab = "char" | "MC" | "FG" | "PM" | "GC";
const activeTab = toRef(cache.search, "tab");
</script>

<template>
  <n-space vertical>
    <n-card>
      <n-tabs
        v-model:value="activeTab"
        @update:value="clearResults"
        type="line"
        scrollable
        animated
      >
        <n-tab-pane name="char" tab="依字">
          <n-space align="center">
            <n-form inline style="max-width: 90%" @submit.prevent="searchChar">
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
          <n-form inline :model="formMC" @submit.prevent="searchMC">
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
          <n-form inline :model="formFG" @submit.prevent="searchFG">
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

        <n-tab-pane name="PM" tab="依普通話">
          <n-space align="center">
            <n-form inline style="max-width: 90%" @submit.prevent="searchPM">
              <n-form-item>
                <n-input
                  v-model:value="formPM"
                  placeholder="請輸入拼音"
                  clearable
                />
              </n-form-item>
              <n-form-item>
                <n-button attr-type="submit" type="primary"> 查找 </n-button>
              </n-form-item>
            </n-form>
          </n-space>
        </n-tab-pane>

        <n-tab-pane name="GC" tab="依廣州話">
          <n-space align="center">
            <n-form inline style="max-width: 90%" @submit.prevent="searchGC">
              <n-form-item>
                <n-input
                  v-model:value="formGC"
                  placeholder="請輸入拼音"
                  clearable
                />
              </n-form-item>
              <n-form-item>
                <n-button attr-type="submit" type="primary"> 查找 </n-button>
              </n-form-item>
            </n-form>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <n-card>
      <div v-if="searchInfo" v-html="searchInfo" style="margin-bottom: 1em" />
      <div
        v-if="activeTab !== 'char' && searchResults.length > 0"
        style="margin-bottom: 2em"
      >
        可能的撫州話發音：
        <template v-for="(pronunciation, index) of resultsSet">
          <Pronunciation :pronunciation="pronunciation" /><span
            v-if="index < resultsSet.size - 1"
            >,
          </span>
        </template>
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

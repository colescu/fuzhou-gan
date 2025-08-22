<script setup lang="ts">
import { computed, h, inject, ref, toRef, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useHistoryStore } from "@/stores/history";
import { renderPartsLabel } from "@/library/lang-utils/parts";
import { getFormLangUtils, ITEMS_MAP } from "@/library/search/form-lang";
import { getSearchResultsByFilter } from "@/library/search/search";
import { normalizePinyin } from "@/library/search/search-pron";
import { computeGridOffset } from "@/library/dom/compute";

import MultipleSelect from "../common/MultipleSelect.vue";
import {
  NSpace,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NFormItemGi,
  NGrid,
  NSlider,
} from "naive-ui";

const settings = useSettingsStore();
const history = useHistoryStore();
const langMode = toRef(history.search, "langMode");

const { language = "FG" } = defineProps<{ language: Language }>();
const searchWrapper = inject("searchWrapper") as any;

const LANG_MODES = {
  0: { label: "不拆分", value: null },
  1: { label: "韻母", value: "final" },
  2: { label: "韻 + 介音", value: "rhyme" },
  3: { label: "介音 + 韻腹 + 韻尾", value: "full" },
} as const;
export type LangMode = keyof typeof LANG_MODES;

const formPinyin = ref<string>("");

const searchPinyin = searchWrapper(() => {
  const [syllable, tones] = normalizePinyin(formPinyin.value, "FG");
  const pinyins = (tones === "" ? [""] : tones.split("")).map(
    (tone) => syllable + tone
  );
  return getSearchResultsByFilter(
    (entry) => pinyins.includes(entry.讀音),
    language,
    settings.includePredicted
  );
});

const FormLangUtils = computed(() =>
  getFormLangUtils(language, LANG_MODES[langMode.value].value ?? "full")
);
const formLang = ref(FormLangUtils.value.EMPTY_FORM);
const optionsLang = computed(() =>
  FormLangUtils.value.computeOptions(formLang.value)
);

const searchLang = searchWrapper(() =>
  getSearchResultsByFilter(
    FormLangUtils.value.getChecker(formLang.value),
    language,
    settings.includePredicted
  )
);

watch(
  langMode,
  () => {
    formLang.value = FormLangUtils.value.EMPTY_FORM;
  },
  { immediate: true }
);

const offset = computed<string>(() => {
  const numItems = ITEMS_MAP[LANG_MODES[langMode.value].value ?? "full"].length;
  return `${computeGridOffset(numItems, 2)} 600:${computeGridOffset(
    numItems,
    4
  )}`;
});
</script>

<template>
  <n-space
    align="center"
    justify="center"
    style="margin-top: 1em; margin-bottom: 2em"
  >
    <div>拆分程度：</div>
    <n-slider
      v-model:value="langMode"
      :min="0"
      :max="3"
      :format-tooltip="(key) => LANG_MODES[key as LangMode].label"
      style="width: 12em"
    />
  </n-space>

  <n-space v-if="langMode === 0" align="center">
    <n-form inline class="search-input" @submit.prevent="searchPinyin">
      <n-form-item>
        <n-input
          :input-props="{ name: 'pinyin' }"
          v-model:value="formPinyin"
          placeholder="請輸入拼音"
          clearable
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="submit" type="primary"> 查詢 </n-button>
      </n-form-item>
    </n-form>
  </n-space>

  <n-form
    v-else
    class="grid-form"
    :model="formLang"
    @submit.prevent="searchLang"
  >
    <n-grid cols="2 600:4" :x-gap="24">
      <n-form-item-gi
        :label-props="{ for: item }"
        v-for="item of FormLangUtils.ITEMS"
        :key="item"
        :label="item"
        :path="item"
      >
        <MultipleSelect
          :id="item"
          v-model="formLang[item]"
          :options="optionsLang[item]"
          :get-label="
                    FormLangUtils.getOptionLabel![item](settings.format)
                  "
          :render-label="(option) => h('div', {'innerHTML': renderPartsLabel(option.label as string, settings.format)})"
          select-all
        />
      </n-form-item-gi>
      <n-form-item-gi :offset="offset" class="submit">
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

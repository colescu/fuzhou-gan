<script setup lang="ts">
import { inject, ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { getSearchResultsByChars } from "@/library/search/search";

import { NSpace, NInput, NButton, NForm, NFormItem } from "naive-ui";

const settings = useSettingsStore();

const { language = "FG" } = defineProps<{ language: Language }>();
const searchWrapper = inject("searchWrapper") as any;

const formChar = ref<string>("");

const searchChar = searchWrapper(() => {
  return getSearchResultsByChars(
    formChar.value.split(""),
    language,
    settings.includePredicted
  );
});
</script>

<template>
  <n-space align="center">
    <n-form inline class="search-input" @submit.prevent="searchChar">
      <n-form-item>
        <n-input
          :input-props="{ name: 'char' }"
          v-model:value="formChar"
          placeholder="請輸入漢字"
          clearable
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="submit" type="primary"> 查詢 </n-button>
      </n-form-item>
    </n-form>
  </n-space>

  <Teleport to="#help"> 可同時查詢多個漢字。 </Teleport>
</template>

<style scoped></style>

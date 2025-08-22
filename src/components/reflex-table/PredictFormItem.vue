<script setup lang="ts">
import { computed, watch } from "vue";
import { useHistoryStore } from "@/stores/history";
import { useWindowSize } from "@vueuse/core";
import {
  getFieldOptions,
  GROUP_OPTIONS,
  type FeatureKey,
  type LangFeatureKey,
} from "@/library/reflex-table/form-predict";
import { LANGUAGE_MAP } from "@/library/constants/language";

import { NSpace, NSelect, NIcon } from "naive-ui";
import { CornerDownRight as DownRight } from "@vicons/tabler";

const history = useHistoryStore();

const formItem = defineModel<FeatureKey | LangFeatureKey>({
  required: true,
});

const { includeLang } = defineProps<{
  includeLang?: boolean;
}>();

const languageOptions = computed(() => {
  const options = [
    { value: "MC", label: "中古漢語" },
    ...history.languages.map((lang) => ({
      value: lang,
      label: LANGUAGE_MAP[lang],
    })),
  ];
  if (includeLang) {
    options.splice(1, 0, { value: "lang", label: "現代方言" });
  }
  return options;
});

const fieldOptions = computed(() => [
  ...getFieldOptions(formItem.value.language, formItem.value.group),
]);

watch(
  () => [formItem.value.language, formItem.value.group],
  () => {
    if (
      !fieldOptions.value
        .map((option) => (option as any).value)
        .includes(formItem.value.field)
    ) {
      formItem.value.field = "";
    }
  },
  { immediate: true }
);

const { width } = useWindowSize();
const isWide = computed(() => width.value >= 600);
</script>

<template>
  <n-space :vertical="!isWide">
    <n-space align="center">
      <n-select
        v-model:value="formItem.language"
        :options="languageOptions"
        class="select-language"
      />
      <n-select
        v-model:value="formItem.group"
        :options="GROUP_OPTIONS"
        class="select-group"
      />
    </n-space>

    <n-space align="center" :style="{ marginLeft: isWide ? '0' : '1em' }">
      <n-icon v-if="!isWide" size="large" :component="DownRight" />
      <n-select
        v-model:value="formItem.field"
        :options="fieldOptions"
        class="select-field"
      >
        <template #empty> 請先選擇語言 </template>
      </n-select>
    </n-space>
  </n-space>
</template>

<style scoped>
.select-language {
  width: 7.5em;
}

.select-group {
  width: 5.5em;
}

.select-field {
  width: 12em;
}
</style>

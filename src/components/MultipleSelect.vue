<script setup lang="ts">
import { computed } from "vue";

import { NSelect, type SelectOption } from "naive-ui";

const { modelValue, options, getLabel, all } = defineProps<{
  modelValue: string[];
  options: string[];
  getLabel?: (option: string) => string;
  all?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const allSelectOptions = computed<SelectOption[]>(() => {
  const selectOptions = options.map((option: string) => ({
    label: getLabel ? getLabel(option) : option,
    value: option,
  }));
  if (all) {
    return [
      ...selectOptions,
      {
        label: "全選",
        value: "__all__",
      },
    ];
  } else {
    return selectOptions;
  }
});

function handleSelect(value: string[]): void {
  emit(
    "update:modelValue",
    value.includes("__all__")
      ? options
      : value.filter((option) => options.includes(option))
  );
}
</script>

<template>
  <n-select
    :value="modelValue"
    :options="allSelectOptions"
    @update:value="handleSelect"
    placeholder=""
    multiple
    clearable
  />
</template>

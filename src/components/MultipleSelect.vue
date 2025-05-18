<script setup lang="ts">
import { computed } from "vue";
import { NSelect, type SelectOption } from "naive-ui";

const props = defineProps<{
  modelValue: string[];
  options: string[];
  getLabel?: (option: string) => string;
  all?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const allSelectOptions = computed<SelectOption[]>(() => {
  const selectOptions = props.options.map((option: string) => ({
    label: props.getLabel ? props.getLabel(option) : option,
    value: option,
  }));
  if (props.all) {
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
      ? props.options
      : value.filter((option) => props.options.includes(option))
  );
}
</script>

<template>
  <n-select
    :value="props.modelValue"
    :options="allSelectOptions"
    @update:value="handleSelect"
    placeholder=""
    multiple
    clearable
  />
</template>

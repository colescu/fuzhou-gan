<script setup lang="ts">
import { nextTick, watch, type Component } from "vue";

import { NPopover, NFloatButton, NIcon } from "naive-ui";

// ad hoc implementation

const { icon, right, bottom, onUpdateShow } = defineProps<{
  icon: Component;
  right: number;
  bottom: number;
  onUpdateShow?: () => void;
}>();

const showPopover = defineModel<boolean>({
  default: false,
});

watch(
  showPopover,
  async () => {
    if (onUpdateShow !== undefined) {
      onUpdateShow();
    }

    await nextTick();
    document.querySelectorAll(".fixed-popover").forEach((popover) => {
      popover.parentElement!.parentElement!.style.position = "fixed";
    });
  },
  { immediate: true }
);
</script>

<template>
  <n-popover
    v-model:show="showPopover"
    trigger="click"
    v-bind="$attrs"
    class="fixed-popover"
  >
    <template #trigger>
      <n-float-button :right="right" :bottom="bottom">
        <n-icon :component="icon" />
      </n-float-button>
    </template>

    <slot />
  </n-popover>
</template>

<style scoped></style>

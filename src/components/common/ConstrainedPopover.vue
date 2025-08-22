<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getIsMobile } from "@/library/common/device";

import { NPopover, type PopoverTrigger } from "naive-ui";

const { trigger = "manual" } = defineProps<{ trigger?: PopoverTrigger }>();
const showPopover = defineModel<boolean>("show", {
  default: false,
});

const target = ref<HTMLElement | null>(null);

// do not trigger if click on whitelist

const WHITELIST = [".n-popover", ".n-float-button", ".popover-target"];

async function handleClick(e: MouseEvent) {
  const clicked = e.target as HTMLElement;

  if (target.value?.contains(clicked)) {
    showPopover.value = !showPopover.value;
    // TODO TECHNCIAL update popover z-index instead
    e.stopPropagation();
  } else if (
    WHITELIST.some((selector) =>
      Array.from(document.querySelectorAll(selector)).some((el) =>
        el.contains(clicked)
      )
    )
  ) {
  } else {
    showPopover.value = false;
  }
}

if (trigger === "manual") {
  onMounted(() => {
    document.addEventListener("click", handleClick, true);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClick, true);
  });
}

// close popover if target gets covered

function getIsVisible(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();

  if (
    rect.bottom < 0 ||
    rect.top > window.innerHeight ||
    rect.right < 0 ||
    rect.left > window.innerWidth
  ) {
    return false;
  }

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const topElement = document.elementFromPoint(x, y);

  // skip popovers
  if (
    Array.from(document.querySelectorAll(".n-popover")).some((popover) =>
      popover.contains(topElement)
    )
  ) {
    return true;
  }

  return topElement === el || el.contains(topElement);
}

function checkVisibility() {
  if (!target.value) return;
  if (!getIsVisible(target.value)) {
    showPopover.value = false;
  }
}

onMounted(() => {
  window.addEventListener("scroll", checkVisibility, true);
  window.addEventListener("resize", checkVisibility);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkVisibility, true);
  window.removeEventListener("resize", checkVisibility);
});
</script>

<template>
  <n-popover
    v-model:show="showPopover"
    :trigger="trigger === 'hover' && getIsMobile() ? 'click' : trigger"
    v-bind="$attrs"
  >
    <template #trigger>
      <span ref="target" class="popover-target">
        <slot name="trigger" />
      </span>
    </template>

    <slot />
  </n-popover>
</template>

<style scoped></style>

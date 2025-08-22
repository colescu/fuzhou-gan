<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { getColumns } from "../../library/dom/table";

import { NButton, NIcon } from "naive-ui";
import { Expand } from "@vicons/ionicons5";
import { watch } from "vue";

const { n = 1 } = defineProps<{
  n?: number;
}>();

function makeFirstNColumnsStick(table: HTMLTableElement, n: number) {
  const allColumns = getColumns(table);

  // remove outer borders
  allColumns.forEach((column, colIndex) => {
    if (colIndex === 0) {
      column.forEach((cell) => {
        cell.style.borderLeft = "none";
      });
    }
    if (colIndex === allColumns.length - 1) {
      column.forEach((cell) => {
        cell.style.borderRight = "none";
      });
    }
  });

  const columns = allColumns.slice(0, n);
  const widths = columns.map((column) => column[0]!.offsetWidth);
  columns.forEach((column, colIndex) => {
    const left = widths.slice(0, colIndex).reduce((a, b) => a + b, 0);
    column.forEach((cell, rowIndex) => {
      Object.assign(cell.style, {
        position: "sticky",
        left: left + "px",
        zIndex: rowIndex === 0 ? 7 : 6,
      });
    });
  });
}

const table = ref<HTMLTableElement | null>(null);
let observer: MutationObserver | null = null;

onMounted(() => {
  if (!table.value) return;
  makeFirstNColumnsStick(table.value, n);

  observer = new MutationObserver(async () => {
    await nextTick();
    if (!table.value) return;
    makeFirstNColumnsStick(table.value, n);
  });
  observer.observe(table.value, { childList: true, subtree: true });
});
onBeforeUnmount(() => {
  observer?.disconnect();
});

// resize handle
// ChatGPT

const height = ref(window.innerHeight * 0.6);
const minHeight = window.innerHeight * 0.3;
const maxHeight = window.innerHeight * 0.9;

let startY = 0;
let startHeight = 0;

const startDrag = (e: MouseEvent | TouchEvent) => {
  startY = e instanceof MouseEvent ? e.clientY : e.touches[0]!.clientY;
  startHeight = height.value;

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag, { passive: false });
  window.addEventListener("touchend", stopDrag);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  const currentY = e instanceof MouseEvent ? e.clientY : e.touches[0]!.clientY;
  const dy = currentY - startY;
  height.value = Math.min(maxHeight, Math.max(minHeight, startHeight + dy));
};

const stopDrag = () => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
};

// fullscreen toggle

const isFullscreen = ref<boolean>(false);

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

document.addEventListener("click", (event) => {
  const target = event.target as Node;

  if (
    ["n-popover", "n-float-button"]
      .map((className) =>
        Array.from(document.querySelectorAll<HTMLElement>(`.${className}`))
      )
      .flat()
      .some((node) => node.contains(target))
  )
    return;

  const table = document.querySelector<HTMLElement>(".sticky-row-column");
  if (table && !table.contains(target)) {
    isFullscreen.value = false;
  }
});

watch(isFullscreen, (value) => {
  const overlay = document.querySelector(".fullscreen-overlay") as HTMLElement;
  overlay.style.display = value ? "block" : "none";
});
</script>

<template>
  <div>
    <div
      class="center"
      style="max-width: fit-content"
      :style="isFullscreen ? {} : { position: 'relative', margin: '2em auto' }"
      :class="{ fullscreen: isFullscreen }"
    >
      <div
        class="sticky-row-column"
        :style="isFullscreen ? {} : { height: height + 'px' }"
      >
        <table ref="table">
          <slot />
        </table>

        <n-button class="fullscreen-toggle" @click="toggleFullscreen" text>
          <n-icon :component="Expand" />
        </n-button>
      </div>
    </div>

    <div
      v-if="!isFullscreen"
      class="handle"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
    />

    <div class="fullscreen-overlay">.</div>
  </div>
</template>

<style>
.sticky-row-column {
  overflow-x: auto;
  max-width: fit-content;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  z-index: 5;
}

.sticky-row-column table {
  border-collapse: separate;
  border-spacing: 0;
}

.sticky-row-column th,
.sticky-row-column td {
  border: 0.5px solid #ccc;
}

/* remove outer borders */
.sticky-row-column thead th {
  border-top: none;
}
.sticky-row-column tbody tr:last-child th,
.sticky-row-column tbody tr:last-child td {
  border-bottom: none;
}

.sticky-row-column thead th {
  position: sticky;
  top: 0;
  z-index: 6;
}

.sticky-row-column tbody th {
  position: relative;
}

.sticky-row-column thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 7;
}

.sticky-row-column tbody th {
  position: sticky;
  left: 0;
  z-index: 6;
}
</style>

<style scoped>
.handle {
  width: 30px;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
  touch-action: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.handle::before,
.handle::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

.handle::before {
  border-bottom: 6px solid #666;
  margin-bottom: 2px;
}

.handle::after {
  border-top: 6px solid #666;
  margin-top: 2px;
}

.fullscreen-toggle {
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
}

.fullscreen {
  position: fixed;
  inset: 0;
  margin: 0 auto;
  z-index: 1000;
  background: var(--background-color);
}

.fullscreen-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  z-index: 4;
}
</style>

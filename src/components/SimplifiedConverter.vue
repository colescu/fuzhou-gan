<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useSettingsStore } from "../stores/settings";
// @ts-ignore
import * as OpenCC from "opencc-js";

const settings = useSettingsStore();

const container = ref<HTMLElement | null>(null);
let observer: MutationObserver | null = null;

const toSimplified = OpenCC.Converter({ from: "tw", to: "cn" });

function skip(node: Node): boolean {
  let current: Node | null = node;
  while (current) {
    if (current instanceof HTMLElement && current.id === "output") {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}

function convertTextNodes(element: Node) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  let node = walker.nextNode();
  while (node) {
    if (!skip(node) && node.textContent && node.textContent.trim()) {
      node.textContent = toSimplified(node.textContent);
    }
    node = walker.nextNode();
  }
}

onMounted(async () => {
  if (!container.value) return;

  if (settings.isSimplified) {
    convertTextNodes(container.value);

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (skip(node)) return;
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent && node.textContent.trim()) {
              node.textContent = toSimplified(node.textContent);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            convertTextNodes(node);
          }
        });
      }
    });
    observer.observe(container.value, {
      childList: true,
      subtree: true,
    });

    const portalRoot =
      document.querySelector(".n-popover-portal") || document.body;
    observer.observe(portalRoot, {
      childList: true,
      subtree: true,
    });
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

watch(
  () => settings.isSimplified,
  () => {
    window.location.reload();
  }
);
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useSettingsStore } from "@/stores/settings";
// @ts-ignore
import * as OpenCC from "opencc-js";

const settings = useSettingsStore();

const container = ref<HTMLElement | null>(null);
let observer: MutationObserver | null = null;

const simplifier = OpenCC.Converter({ from: "tw", to: "cn" });
function toSimplified(text: string) {
  const simplified = simplifier(text);
  return simplified.replace("𠮶", "个");
}

function skip(node: Node): boolean {
  let current: Node | null = node;
  while (current) {
    // skip .no-simplify
    if (
      current.nodeType === Node.ELEMENT_NODE &&
      (current as Element).classList.contains("no-simplify")
    ) {
      return true;
    }
    // skip #output in Pronounce
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
        // target text changes
        if (
          mutation.type === "characterData" &&
          mutation.target.nodeType === Node.TEXT_NODE
        ) {
          const oldText = mutation.target.textContent ?? "";
          const newText = toSimplified(oldText);
          if (oldText !== newText) {
            mutation.target.textContent = newText;
          }
        }
        // target new nodes
        else {
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
      }
    });
    observer.observe(container.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // target NPopover
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

// keep scroll position on page reload
function saveScroll() {
  sessionStorage.setItem("scrollY", window.scrollY.toString());
}
onMounted(() => {
  const y = sessionStorage.getItem("scrollY");
  if (y) {
    requestAnimationFrame(() => {
      window.scrollTo(0, parseInt(y));
      sessionStorage.removeItem("scrollY");
    });
  }
  window.addEventListener("beforeunload", saveScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", saveScroll);
});
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "./stores/settings";

import SimplifiedConverter from "./components/wrapper/SimplifiedConverter.vue";
import NavBar from "./components/NavBar.vue";
import Float from "./components/Float.vue";
import {
  NConfigProvider,
  NMessageProvider,
  zhCN,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  type GlobalThemeOverrides,
} from "naive-ui";

function getCSSVariable(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: getCSSVariable("colescu"),
    primaryColorHover: getCSSVariable("colescu-light"),
    primaryColorPressed: getCSSVariable("colescu-dark"),
  },
};

const settings = useSettingsStore();
watch(
  () => settings.colorizeChar,
  (value) => {
    document.documentElement.style.setProperty(
      "--char-color",
      getCSSVariable(value ? "colescu" : "text-color")
    );
  },
  { immediate: true }
);

const route = useRoute();
const hideNavbar = computed(() => route.meta.hideNavbar === true);
</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <SimplifiedConverter>
        <n-layout>
          <n-layout-header v-if="!hideNavbar">
            <NavBar />
          </n-layout-header>
          <n-layout-content id="view">
            <router-view v-slot="{ Component }">
              <Transition name="fade" mode="out-in">
                <component :is="Component" />
              </Transition>
            </router-view>
          </n-layout-content>
        </n-layout>
        <Float />
      </SimplifiedConverter>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.n-layout-content {
  width: 80%;
  margin: 65px auto;
  overflow: visible;
}

@media (max-width: 600px) {
  .n-layout-content {
    width: 90%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

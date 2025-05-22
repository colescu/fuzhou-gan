<script setup lang="ts">
import SimplifiedConverter from "./components/SimplifiedConverter.vue";
import NavBar from "./components/NavBar.vue";
import Settings from "./components/Settings.vue";
import {
  NConfigProvider,
  NMessageProvider,
  zhCN,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
} from "naive-ui";

const themeOverrides = {
  common: {},
};
</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <SimplifiedConverter>
        <n-layout>
          <n-layout-header>
            <NavBar />
          </n-layout-header>
          <n-layout-content>
            <RouterView />
          </n-layout-content>
        </n-layout>
        <Settings />
      </SimplifiedConverter>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.n-layout-content {
  width: 80%;
  margin: 5em auto;
  overflow: visible;
}

@media (max-width: 600px) {
  .n-layout-content {
    width: 90%;
  }
}
</style>

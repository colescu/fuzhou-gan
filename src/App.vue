<script setup lang="ts">
import SimplifiedConverter from "./components/SimplifiedConverter.vue";
import NavBar from "./components/NavBar.vue";
import Settings from "./components/Settings.vue";
import { NConfigProvider, NMessageProvider, zhCN } from "naive-ui";
</script>

<template>
  <n-config-provider :locale="zhCN">
    <n-message-provider>
      <SimplifiedConverter>
        <div id="app">
          <NavBar />
          <main>
            <RouterView />
          </main>
        </div>
        <div style="height: 3em"></div>
        <Settings />
      </SimplifiedConverter>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>

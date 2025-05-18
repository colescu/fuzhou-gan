<script setup lang="ts">
import { RouterLink } from "vue-router";
import { NLayout, NLayoutHeader, NSpace, NButton, NIcon } from "naive-ui";
import { LogoGithub } from "@vicons/ionicons5";
</script>

<template>
  <n-layout>
    <n-layout-header>
      <n-space justify="space-between" align="center" class="navbar">
        <RouterLink to="/">
          <n-button text>撫州話</n-button>
        </RouterLink>

        <n-space justify="center" align="center" :size="20">
          <RouterLink to="/introduction">
            <n-button text>介紹</n-button>
          </RouterLink>
          <RouterLink to="/phonology">
            <n-button text>發音</n-button>
          </RouterLink>
          <RouterLink to="/vocbulary">
            <n-button text>詞彙</n-button>
          </RouterLink>
          <RouterLink to="/search">
            <n-button text>查字</n-button>
          </RouterLink>
          <RouterLink to="/pronounce">
            <n-button text>注音</n-button>
          </RouterLink>
        </n-space>

        <n-button
          tag="a"
          href="https://github.com/colescu/fuzhou-gan"
          target="_blank"
          text
        >
          <n-icon size="1.5em">
            <LogoGithub />
          </n-icon>
        </n-button>
      </n-space>
    </n-layout-header>
  </n-layout>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--colescu);
  padding: 1em;
}

.n-button {
  color: aliceblue;
}
</style>

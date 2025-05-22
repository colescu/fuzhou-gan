<script setup lang="ts">
import { RouterLink } from "vue-router";

import { NSpace, NButton, NIcon } from "naive-ui";
import { LogoGithub } from "@vicons/ionicons5";
import FuIcon from "@/assets/撫.svg";
</script>

<template>
  <div class="navbar-header">
    <div class="navbar-left">
      <RouterLink to="/">
        <n-button text icon>
          <FuIcon style="width: 2.5em; padding-top: 0.3em" />
        </n-button>
      </RouterLink>
    </div>

    <div class="navbar-center">
      <n-space>
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
    </div>

    <div class="navbar-right">
      <n-button
        tag="a"
        href="https://github.com/colescu/fuzhou-gan"
        target="_blank"
        rel="noopener noreferrer"
        text
      >
        <n-icon :component="LogoGithub" size="2em" />
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5em;
  padding: 0 0.5em;
  background-color: var(--colescu);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.n-button {
  color: aliceblue;
  padding: 0 0.2em;
}
</style>

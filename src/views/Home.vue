<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BASE_URL } from "../library/fetchData";

const entriesCount = computed<number>(
  () => window.DICTIONARY.filter((entry) => entry.撫州話 !== "").length
);

const lastUpdate = ref("2025 年 5 月 22 日");
onMounted(async () => {
  const response = await fetch(`${BASE_URL}/last-update.txt`);
  if (response.ok) {
    lastUpdate.value = await response.text();
  }
});
</script>

<template>
  <div class="center">
    <img src="/assets/撫州話.svg" width="300" alt="撫州話" />
    <div style="font-size: 1.5em">歡迎來到苦芋頭的撫州話網站</div>
    <br />
    <div>
      收錄字條數：{{ entriesCount }}<br />
      更新時間：<span>{{ lastUpdate }}</span>
    </div>
  </div>
</template>

<style scoped></style>

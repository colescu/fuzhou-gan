<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { dictionaryCache } from "@/library/data/core-data";
import { lastUpdateCache, toChineseDate } from "@/library/data/date";

import Fuzhouhua from "@/assets/撫州話.svg";

const charactersCount = computed<number>(() => {
  const DICTIONARY = dictionaryCache.get("FG");
  return (
    new Set(
      DICTIONARY.filter(
        (entry) => entry.字頭 !== "□" && entry.記錄讀音 != null
      ).map((entry) => entry.字頭)
    ).size + DICTIONARY.filter((entry) => entry.字頭 == "□").length
  );
});
const entriesCount = computed<number>(
  () =>
    dictionaryCache.get("FG").filter((entry) => entry.記錄讀音 != null).length
);

const lastUpdateFrontend = ref(__LAST_UPDATE__);
onBeforeMount(async () => {
  const lastUpdateBackend = await lastUpdateCache.getAsync();
  if (
    lastUpdateBackend &&
    lastUpdateBackend > new Date(lastUpdateFrontend.value)
  ) {
    lastUpdateFrontend.value = lastUpdateBackend.toISOString();
  }
});
</script>

<template>
  <div id="home" class="center center-text">
    <Fuzhouhua width="300" />
    <div style="font-size: 1.5em; margin-top: 0.2em">
      歡迎來到苦芋頭的撫州話網站
    </div>
    <br />
    <div>
      收錄撫州話 {{ charactersCount }} 字、{{ entriesCount }} 條讀音<br />
      最後更新：{{ toChineseDate(lastUpdateFrontend) }}
    </div>
  </div>
</template>

<style scoped>
#home {
  flex-direction: column;
  height: 65vh;
}
</style>

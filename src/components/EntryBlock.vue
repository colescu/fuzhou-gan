<script setup lang="ts">
import Pronunciation from "./Pronunciation.vue";
import { NCard, NSpace, NTag, NEllipsis } from "naive-ui";

defineProps<{
  entry: Entry;
}>();
</script>

<template>
  <!-- TODO design -->
  <n-card>
    <div class="block">
      <span style="font-size: 3em; margin-right: 0.1em">
        {{ entry.字頭 }}
      </span>

      <n-space vertical>
        <n-space>
          <n-space align="center">
            <n-tag size="small"> 記錄音 </n-tag>
            <span v-if="entry.撫州話">
              <Pronunciation :pronunciation="entry.撫州話" /><span
                v-if="entry.文白新"
                class="reading-type"
                >&nbsp;{{ entry.文白新 }}</span
              ><span v-if="entry.訓作"
                >&nbsp;&nbsp;{{ `訓作「${entry.訓作}」` }}</span
              >
            </span>
            <span v-else>無</span>
          </n-space>
          <n-space v-if="entry.推導撫州話 !== ''" align="center">
            <n-tag size="small"> 推導音 </n-tag>
            <span v-if="entry.推導撫州話 !== entry.撫州話"
              >*<Pronunciation :pronunciation="entry.推導撫州話"
            /></span>
            <span v-else>同</span>
          </n-space>
          <n-space v-if="entry.釋義" align="center">
            <n-tag size="small"> 釋義 </n-tag>
            <span>{{ entry.釋義 }}</span>
          </n-space>
        </n-space>

        <template v-if="entry.推導撫州話 !== ''">
          <n-space>
            <n-space align="center">
              <n-tag size="small"> 中古拼音 </n-tag>
              {{ entry.中古拼音 }}
            </n-space>
            <n-space align="center">
              <n-tag size="small"> 音韻 </n-tag>
              {{ entry.音韻地位 + " " + entry.反切 }}
            </n-space>
          </n-space>
          <n-space align="center">
            <n-tag size="small"> 廣韻釋義 </n-tag>
            <n-ellipsis style="max-width: 16em">
              {{ entry.廣韻釋義 }}
              <template #tooltip>
                <div style="max-width: 30em">
                  {{ entry.廣韻釋義 }}
                </div>
              </template>
            </n-ellipsis>
          </n-space>
        </template>
      </n-space>
    </div>
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 30em;
  margin: 0 auto;
}

.n-tag {
  margin-right: -0.4em;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-wrap: nowrap;
  align-items: left;
}

@media (min-width: 600px) {
  .block {
    flex-direction: row;
    align-items: center;
  }
}
</style>

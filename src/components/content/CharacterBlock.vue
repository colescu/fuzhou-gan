<script setup lang="ts">
import { NCard, NSpace, NTag } from "naive-ui";

export type CharacterData = {
  character: string;
  pronunciation: string;
  meaning: string;
  mandarin: string;
  comment: string;
  example: string;
};

const { data } = defineProps<{ data: CharacterData }>();
</script>

<template>
  <n-card>
    <div class="block">
      <div class="char">
        {{ data.character }}
      </div>
      <n-space style="font-size: 1.5em; margin-top: 0.9em" vertical>
        <n-space align="center">
          <DoublePronunciation
            :pronunciation="data.pronunciation"
            source-format="ipaRaw"
          />
        </n-space>
        <n-space align="center" style="white-space: nowrap">
          {{ data.meaning }}
        </n-space>
      </n-space>
    </div>
    <n-space vertical>
      <n-space v-if="data.mandarin" align="center">
        <n-tag size="small"> 普通話 </n-tag>
        <Pronunciation
          :pronunciation="data.mandarin"
          format="pinyin"
          language="PM"
        />
      </n-space>
      <div v-if="data.comment" style="display: flex; align-items: flex-start">
        <n-tag size="small" style="margin-right: 8px">釋義</n-tag>
        <span>{{ data.comment }}</span>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.n-card {
  display: flex;
  justify-content: center;
  margin: 1.5em auto;
  width: 20em;
}

.block {
  display: flex;
  justify-content: left;
  align-items: start;
  gap: 1.5em;
  margin-top: -1em;
}

.char {
  font-size: 5em;
  min-width: 1em;
}
</style>

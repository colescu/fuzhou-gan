<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { yamlCache } from "@/library/data/core-data";
import seedrandom from "seedrandom";

import { NSpace, NButton } from "naive-ui";
import CharacterBlock, {
  type CharacterData,
} from "@/components/content/CharacterBlock.vue";

const characters = ref<CharacterData[] | null>();
const chosenCharacter = ref<CharacterData | null>();

onBeforeMount(async () => {
  characters.value = (
    (await yamlCache.getAsync("characters")) as CharacterData[]
  ).filter((entry) => entry.mandarin != null);
  const today = new Date().toISOString().slice(0, 10);
  const rng = seedrandom(today);
  chosenCharacter.value =
    characters.value[Math.floor(rng() * characters.value.length)];
});

function getRandom() {
  if (characters.value) {
    chosenCharacter.value =
      characters.value[Math.floor(Math.random() * characters.value.length)];
  }
}
</script>

<template>
  <n-space vertical align="center">
    <CharacterBlock v-if="chosenCharacter" :data="chosenCharacter" />

    <n-button @click="getRandom" type="primary"> 換一個 </n-button>
  </n-space>
</template>

<style scoped></style>

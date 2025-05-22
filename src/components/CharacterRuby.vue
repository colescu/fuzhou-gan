<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settings";

import Pronunciation from "./Pronunciation.vue";

const route = useRoute();
const settings = useSettingsStore();

const { character, pronunciation } = defineProps<{
  character: string;
  pronunciation: string;
}>();

const mustShow = computed<boolean>(() => ["/phonology"].includes(route.path));
</script>

<template>
  <ruby>
    <span class="char">{{ character }}</span>
    <template
      v-if="pronunciation !== '' && (mustShow || settings.displayPronunciation)"
    >
      <rp>(</rp>
      <rt>
        <Pronunciation :pronunciation="pronunciation" />
      </rt>
      <rp>)</rp>
    </template>
  </ruby>
</template>

<style scoped>
ruby rt {
  font-size: 0.8em;
  padding: 0 0.1em;
  margin-top: 0.4em;
  margin-bottom: 0.05em;
}
</style>

<script setup lang="ts">
import { useSettingsStore } from "../stores/settings";
import { FGUtils } from "../lib/FGSyllable";

defineProps<{
  character: string;
  pronunciation: string;
}>();

const settings = useSettingsStore();
</script>

<template>
  <ruby>
    <span class="char">{{ character }}</span>
    <template v-if="settings.displayPronunciation">
      <rp>(</rp>
      <rt :class="settings.phoneticAlphabet">
        {{ FGUtils.showPronunciation(pronunciation, settings) }}
      </rt>
      <rp>)</rp>
    </template>
  </ruby>
</template>

<style scoped>
.char {
  text-align: center;
}

ruby rt {
  font-size: 0.8em;
  padding: 0 0.1em;
  margin-top: 0.2em;
}

.ipa {
  margin-left: 0.2em;
}
</style>

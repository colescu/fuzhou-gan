<script setup lang="ts">
import { useSettingsStore } from "../stores/settings";
import EntryUtils from "../lib/entryUtils";
import { FGUtils } from "../lib/FGSyllable";

defineProps<{
  entry: Entry;
}>();

const settings = useSettingsStore();
</script>

<template>
  <span class="char">{{ entry.字頭 }}</span
  >&nbsp;<span>{{ EntryUtils.isPredicted(entry) ? "*" : "" }}</span
  ><span :class="settings.phoneticAlphabet">
    {{ FGUtils.showPronunciation(EntryUtils.getFG(entry), settings) }}</span
  ><span v-if="entry.文白新" class="reading-type">&nbsp;{{ entry.文白新 }}</span
  ><span v-if="entry.訓作">&nbsp;{{ `訓作「${entry.訓作}」` }}</span
  ><span v-if="entry.音韻地位">&nbsp;{{ entry.音韻地位 }}</span>
</template>

<style scoped></style>

<script setup lang="ts">
import EntryUtils from "../library/entryUtils";

import Pronunciation from "./Pronunciation.vue";

defineProps<{
  entry: Entry;
}>();
</script>

<template>
  <span class="char">{{ entry.字頭 }}</span
  >&nbsp;<span>{{ EntryUtils.isPredicted(entry) ? "*" : "" }}</span
  ><Pronunciation :pronunciation="EntryUtils.getFGPronunciation(entry)" /><span
    v-if="entry.文白新"
    class="reading-type"
    >&nbsp;{{ entry.文白新 }}</span
  ><span v-if="entry.訓作">&nbsp;{{ `訓作「${entry.訓作}」` }}</span
  ><span v-if="entry.音韻地位">&nbsp;{{ entry.音韻地位 }}</span>
</template>

<style scoped></style>

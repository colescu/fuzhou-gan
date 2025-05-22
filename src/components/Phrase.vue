<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useManagedSequentialAudio } from "../composables/audio";

import CharacterRuby from "./CharacterRuby.vue";
import { NButton, NIcon } from "naive-ui";
import { PlayCircleOutline, StopCircleOutline } from "@vicons/ionicons5";

const settings = useSettingsStore();

const { phrase } = defineProps<{
  phrase: RubyData[];
}>();

const pronunciations = computed<string[]>(() =>
  phrase.map((ruby) => ruby.pronunciation)
);
const isPlaying = ref<boolean>(false);
const { toggleAudio } = useManagedSequentialAudio(pronunciations, isPlaying);
</script>

<template>
  <n-button
    v-if="settings.displayPronunciation"
    @click="toggleAudio"
    class="float"
    size="tiny"
    text
  >
    <n-icon :component="isPlaying ? StopCircleOutline : PlayCircleOutline" />
  </n-button>
  <CharacterRuby
    v-for="ruby of phrase"
    :character="ruby.character"
    :pronunciation="ruby.pronunciation"
  />
</template>

<style scoped>
.float {
  position: absolute;
  margin-left: -0.85em;
  margin-top: -0.85em;
}
</style>

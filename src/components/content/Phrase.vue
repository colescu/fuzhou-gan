<script setup lang="ts">
import { toRef } from "vue";
import { useManagedSequentialAudio } from "@/composables/useAudio";
import { trackHasPhrase } from "@/composables/useTrack";
import type { DefaultProps } from "./Pronunciation.vue";

import CharacterRuby, { type RubyData } from "./CharacterRuby.vue";
import { NButton, NIcon } from "naive-ui";
import { PlayCircleOutline, StopCircleOutline } from "@vicons/ionicons5";

const props = defineProps<
  {
    phrase: RubyData[];
  } & DefaultProps
>();
const { phrase: _, ...rest } = props;

const phrase = toRef(props, "phrase");
const { toggleAudio, isPlaying } = useManagedSequentialAudio(
  phrase,
  rest.sourceFormat
);

trackHasPhrase();
</script>

<template>
  <n-button @click="toggleAudio" class="float" size="tiny" text>
    <n-icon :component="isPlaying ? StopCircleOutline : PlayCircleOutline" />
  </n-button>
  <span class="phrase">
    <template v-for="(ruby, index) of phrase">
      <template v-if="ruby.pronunciation">
        <CharacterRuby
          :key="index"
          :character="ruby.character"
          :pronunciation="ruby.pronunciation"
          v-bind="rest"
        />
      </template>
      <template v-else>
        <span>{{ ruby.character }}</span>
      </template>
    </template>
  </span>
</template>

<style scoped>
.float {
  position: absolute;
  margin-left: -1em;
  margin-top: -0.9em;
}
</style>

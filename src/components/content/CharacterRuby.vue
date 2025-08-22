<script setup lang="ts">
import Character from "./Character.vue";
import Pronunciation, { type DefaultProps } from "./Pronunciation.vue";

export type RubyData = {
  character: string;
  pronunciation: string;
};

const { character, pronunciation, ...rest } = defineProps<
  RubyData & DefaultProps
>();
</script>

<template>
  <ruby>
    <rb>
      <Character
        :character="
          character + (character.includes(':') ? '' : ':' + pronunciation)
        "
      />
    </rb>
    <template v-if="pronunciation">
      <rp>(</rp>
      <rt>
        <Pronunciation :pronunciation="pronunciation" v-bind="rest" />
      </rt>
      <rp>)</rp>
    </template>
  </ruby>
</template>

<style scoped>
ruby rt {
  margin-top: 0.4em;
}
</style>

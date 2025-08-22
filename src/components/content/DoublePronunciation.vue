<script setup lang="ts">
import Double from "./Double.vue";
import Pronunciation, { type DefaultProps } from "./Pronunciation.vue";

const { pronunciation, ...rest } = defineProps<
  { pronunciation: string } & DefaultProps
>();
</script>

<template>
  <Double>
    <template #pinyin>
      <Pronunciation
        :pronunciation="pronunciation"
        v-bind="rest"
        format="pinyin"
      />
    </template>
    <template #ipa>
      <Pronunciation
        :pronunciation="pronunciation"
        v-bind="rest"
        format="ipaStrict"
      />
    </template>
  </Double>
</template>

<style scoped></style>

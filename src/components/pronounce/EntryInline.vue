<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { type DefaultProps } from "../content/Pronunciation.vue";

import DoublePronunciation from "../content/DoublePronunciation.vue";

const { entry, ...rest } = defineProps<
  {
    entry: LangEntry;
  } & DefaultProps
>();

const settings = useSettingsStore();
</script>

<template>
  <span>
    <span class="char no-simplify">{{ entry.字頭 }}</span>
    <span
      >&nbsp;<template v-if="!entry.記錄讀音">*</template>
      <DoublePronunciation :pronunciation="entry.讀音" v-bind="rest" />
    </span>
    <sub v-if="entry.層">&nbsp;{{ entry.層 }}</sub>
    <span v-if="entry.訓作"
      >&ensp;<template v-if="entry.訓作 === '？'">本字存疑</template
      ><template v-else
        >訓作「<span class="char no-simplify">{{ entry.訓作 }}</span
        >」</template
      ></span
    >
    <span v-if="entry.訓作 == null && entry.MC">
      &nbsp;{{ entry.MC.音韻地位(settings.orderingMCInfo) }}</span
    >
    <span v-if="entry.釋義"> &nbsp;{{ entry.釋義 }}</span>
  </span>
</template>

<style scoped></style>

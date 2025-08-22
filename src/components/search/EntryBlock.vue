<script setup lang="ts">
import { LANGUAGE_MAP } from "@/library/constants/language";
import { useSettingsStore } from "@/stores/settings";

import Pronunciation, { type DefaultProps } from "../content/Pronunciation.vue";
import ConstrainedPopover from "../common/ConstrainedPopover.vue";
import { NSpace, NTag } from "naive-ui";

const { entry, ...rest } = defineProps<
  {
    entry: LangEntry;
  } & DefaultProps
>();

const settings = useSettingsStore();
</script>

<template>
  <div class="block">
    <span class="char no-simplify">
      {{ entry.字頭 }}
    </span>

    <n-space vertical>
      <n-space>
        <n-space align="center">
          <n-tag size="small"> 記錄音 </n-tag>
          <span v-if="entry.記錄讀音">
            <Pronunciation :pronunciation="entry.記錄讀音" v-bind="rest" />
            <sub v-if="entry.層">&nbsp;{{ entry.層 }} </sub>
            <span v-if="entry.訓作"
              >&nbsp;<template v-if="entry.訓作 === '？'">本字存疑</template
              ><template v-else
                >訓作「<span class="char no-simplify">{{ entry.訓作 }}</span
                >」</template
              ></span
            >
          </span>
          <span v-else>無</span>
        </n-space>
        <n-space v-if="entry.推導讀音" align="center">
          <n-tag size="small"> 推導音 </n-tag>
          <span v-if="entry.推導讀音 !== entry.記錄讀音">
            *<Pronunciation :pronunciation="entry.推導讀音" v-bind="rest" />
          </span>
          <span v-else>同</span>
        </n-space>
      </n-space>

      <n-space v-if="entry.釋義" align="center">
        <n-tag size="small">
          {{ LANGUAGE_MAP[rest.language ?? "FG"] }}釋義
        </n-tag>
        <span>{{ entry.釋義 }}</span>
      </n-space>

      <n-space v-if="entry.MC" align="center">
        <n-space align="center">
          <n-tag size="small"> 中古音韻 </n-tag>
          {{
            entry.MC.音韻地位(settings.orderingMCInfo) +
            " " +
            (entry.MC.反切 ?? "無反切")
          }}
        </n-space>
      </n-space>

      <n-space v-if="entry.廣韻釋義" align="center" style="flex-wrap: nowrap">
        <n-tag size="small" style="float: left"> 廣韻釋義 </n-tag>
        <ConstrainedPopover trigger="hover">
          <template #trigger>
            <div
              style="
                max-width: 11em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ entry.廣韻釋義 }}
            </div>
          </template>

          <div style="max-width: 16em">
            {{ entry.廣韻釋義 }}
          </div>
        </ConstrainedPopover>
      </n-space>
    </n-space>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1.2em;
  padding: 1em;
  width: 23em;
}

.char {
  font-size: 3em;
  min-width: 1em;
  margin-left: 0.13em;
}

.n-tag {
  margin-right: -0.4em;
}

@media (min-width: 600px) {
  .block {
    margin: 0 1em;
  }
}
</style>

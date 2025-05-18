<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settings";
import { FGUtils } from "../lib/FGSyllable";

import {
  NSpace,
  NPopover,
  NFloatButton,
  NIcon,
  NTag,
  NText,
  NSwitch,
  NRadioGroup,
  NRadioButton,
  NCheckbox,
} from "naive-ui";
import { SettingsOutline, HelpOutline } from "@vicons/ionicons5";

const route = useRoute();
const settings = useSettingsStore();

const hasBoth = computed<boolean>(() => ["/pronounce"].includes(route.path));
const hasSearch = computed<boolean>(() =>
  ["/search", "/pronounce"].includes(route.path)
);
</script>

<template>
  <n-float-button
    :right="66"
    :bottom="16"
    @click="settings.isSimplified = !settings.isSimplified"
  >
    {{ settings.isSimplified ? "简" : "繁" }}
  </n-float-button>

  <n-popover v-if="hasBoth" style="width: 300px" trigger="click">
    <template #trigger>
      <n-float-button :right="16" :bottom="66">
        <n-icon>
          <HelpOutline />
        </n-icon>
      </n-float-button>
    </template>

    <template v-if="route.path === '/pronounce'">
      在文本框中輸入文本即可生成撫州話注音。<br />
      點擊字可查看字條詳情。<br />
      多音字由<span class="highlight">灰色陰影</span>標出，請手動選擇正確讀音。
    </template>
  </n-popover>

  <n-popover style="min-width: max-content" trigger="click">
    <template #trigger>
      <n-float-button :right="16" :bottom="16">
        <n-icon>
          <SettingsOutline />
        </n-icon>
      </n-float-button>
    </template>

    <n-space vertical style="margin: 0.5em 0">
      <n-space align="center">
        <n-tag>注音</n-tag>
        <n-switch
          v-if="!hasSearch"
          v-model:value="settings.displayPronunciation"
        >
          <template #checked> 開 </template>
          <template #unchecked> 関 </template>
        </n-switch>
        <n-radio-group
          v-model:value="settings.phoneticAlphabet"
          :disabled="!hasSearch && !settings.displayPronunciation"
          size="small"
        >
          <n-radio-button value="pinyin">
            拼音
            <span class="pinyin">
              {{
                FGUtils.showPinyin(
                  FGUtils.parseIpa("tɕʰjau3"),
                  settings.pinyinToneNotation
                )
              }}
            </span>
          </n-radio-button>
          <n-radio-button value="ipa">
            音標
            <span class="ipa">
              {{
                FGUtils.showIpa(
                  FGUtils.parseIpa("tɕʰjau3"),
                  settings.ipaToneNotation
                )
              }}
            </span>
          </n-radio-button>
        </n-radio-group>
      </n-space>

      <n-space align="center">
        <n-tag>拼音</n-tag>
        <n-switch v-if="hasBoth" v-model:value="settings.displayPinyin">
          <template #checked> 開 </template>
          <template #unchecked> 関 </template>
        </n-switch>
        <n-space align="center">
          <n-radio-group
            v-model:value="settings.pinyinToneNotation"
            size="small"
          >
            <n-radio-button value="number">調號 a3</n-radio-button>
            <n-radio-button value="diacritic">变音符 â</n-radio-button>
          </n-radio-group>
        </n-space>
      </n-space>

      <n-space align="center">
        <n-tag>音標</n-tag>
        <n-switch v-if="hasBoth" v-model:value="settings.displayIpa">
          <template #checked> 開 </template>
          <template #unchecked> 関 </template>
        </n-switch>
        <n-space align="center">
          <n-radio-group v-model:value="settings.ipaToneNotation" size="small">
            <n-radio-button value="letter">字母 a˦˥</n-radio-button>
            <n-radio-button value="numeral">數字 a⁴⁵</n-radio-button>
          </n-radio-group>
        </n-space>
      </n-space>

      <n-space v-if="hasSearch" align="center">
        <n-tag>字典</n-tag>
        <n-checkbox v-model:checked="settings.includePredicted">
          未收錄字使用推導音
        </n-checkbox>
      </n-space>
    </n-space>
  </n-popover>
</template>

<style scoped></style>

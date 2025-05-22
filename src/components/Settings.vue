<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settings";

import CharacterRuby from "./CharacterRuby.vue";
import Pronunciation from "./Pronunciation.vue";
import {
  NSpace,
  NPopover,
  NFloatButton,
  NIcon,
  NTag,
  NSwitch,
  NRadioGroup,
  NRadioButton,
  NCheckbox,
  NSlider,
} from "naive-ui";
import { SettingsOutline, HelpOutline } from "@vicons/ionicons5";

const route = useRoute();
const settings = useSettingsStore();

const hasBoth = computed<boolean>(() => ["/pronounce"].includes(route.path));
const hasSearch = computed<boolean>(() =>
  ["/search", "/pronounce"].includes(route.path)
);
const hasPronunciation = computed<boolean>(
  () => !["/", "/phonology", "/search", "/pronounce"].includes(route.path)
);
const hasPhrase = computed<boolean>(() =>
  ["/introduction", "/vocabulary", "/pronounce"].includes(route.path)
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

  <n-popover
    v-if="route.path !== '/'"
    style="width: max-content"
    trigger="click"
  >
    <template #trigger>
      <n-float-button :right="16" :bottom="66">
        <n-icon :component="HelpOutline" />
      </n-float-button>
    </template>

    <!-- help info -->

    <template v-if="route.path === '/phonology'">
      音標用 /.../ 標記。<br />
    </template>

    <template v-if="route.path === '/search'">
      過濾欄各項爲「且」關係。<br />
      更精細的查詢請直接用 SQL 查詢<a
        href="https://github.com/colescu/fuzhou-gan-backend/blob/main/data/%E6%92%AB%E5%B7%9E%E8%A9%B1.sqlite3"
        target="_blank"
        rel="noopener noreferrer"
        >數據庫</a
      >。
    </template>

    <template v-else-if="route.path === '/pronounce'">
      在文本框中輸入文本即可生成撫州話注音。<br />
      點擊字可查看字條詳情。<br />
      多音字由<span class="highlight">灰色陰影</span>標出，請手動選擇正確讀音。
    </template>

    <template v-else>
      點擊<CharacterRuby
        :character="'注'"
        :pronunciation="'tu5'"
      /><CharacterRuby :character="'音'" :pronunciation="'in1'" />可聽單字發音。
    </template>
  </n-popover>

  <n-popover style="min-width: max-content" trigger="click">
    <template #trigger>
      <n-float-button :right="16" :bottom="16">
        <n-icon :component="SettingsOutline" />
      </n-float-button>
    </template>

    <n-space vertical style="margin: 0.5em 0">
      <n-space align="center">
        <n-tag>注音</n-tag>
        <n-switch
          v-if="hasPronunciation"
          v-model:value="settings.displayPronunciation"
        >
          <template #checked> 開 </template>
          <template #unchecked> 關 </template>
        </n-switch>
        <n-radio-group
          v-model:value="settings.phoneticAlphabet"
          :disabled="hasPronunciation && !settings.displayPronunciation"
          size="small"
        >
          <n-radio-button value="pinyin">
            拼音
            <Pronunciation
              :pronunciation="'tɕʰjau3'"
              :phonetic-alphabet="'pinyin'"
            />
          </n-radio-button>
          <n-radio-button value="ipa">
            音標
            <Pronunciation
              :pronunciation="'tɕʰjau3'"
              :phonetic-alphabet="'ipa'"
            />
          </n-radio-button>
        </n-radio-group>
      </n-space>

      <n-space align="center">
        <n-tag>拼音</n-tag>
        <n-switch v-if="hasBoth" v-model:value="settings.displayPinyin">
          <template #checked> 開 </template>
          <template #unchecked> 關 </template>
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
          <template #unchecked> 關 </template>
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

      <n-space v-if="hasPhrase" align="center">
        <n-tag>語速</n-tag>
        <n-space vertical style="width: 12em">
          <n-slider
            v-model:value="settings.playSpeed"
            :step="100"
            :max="1000"
            :min="300"
            :format-tooltip="(val) => val / 1000 + ' 秒/字'"
          />
        </n-space>
      </n-space>
    </n-space>
  </n-popover>
</template>

<style scoped>
.n-float-button {
  z-index: 10;
}
</style>

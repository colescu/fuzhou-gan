<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settings";
import { useCacheStore } from "../stores/cache";

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
const cache = useCacheStore();

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
      <template v-if="cache.search.tab === 'char'">
        可同時查找多個漢字。
      </template>
      <template v-if="['MC', 'FG'].includes(cache.search.tab)">
        過濾欄各項爲「且」關係。<br />
        更精細的查詢請直接用 SQL 查詢<a
          href="https://github.com/colescu/fuzhou-gan-backend/blob/main/data/%E6%92%AB%E5%B7%9E%E8%A9%B1.sqlite3"
          target="_blank"
          rel="noopener noreferrer"
          >數據庫</a
        >。
      </template>
      <template v-if="cache.search.tab === 'PM'">
        聲調可用變音符 āáǎà 或數字 1234 。<br />
        數據來自<a
          href="https://github.com/mozillazg/pinyin-data/blob/master/kXHC1983.txt"
          >《現代漢語詞典》</a
        >。
      </template>
      <template v-if="cache.search.tab === 'GC'">
        拼音方案爲粵拼。<br />
        數據來自<a
          href="https://github.com/jyutnet/cantonese-books-data/blob/master/2004_%E5%BB%A3%E5%B7%9E%E8%A9%B1%E6%AD%A3%E9%9F%B3%E5%AD%97%E5%85%B8/B01_%E8%B3%87%E6%96%99.json"
          >《廣州話正音字典》</a
        >。
      </template>
    </template>

    <template v-else-if="route.path === '/pronounce'">
      在文本框中輸入文本即可生成撫州話注音。<br />
      點擊字可查看字條詳情。<br />
      星號 * 表示未收錄的推導音。<br />
      多音字由<span class="highlight">灰色陰影</span>標出，請手動選擇正確讀音。
    </template>

    <template v-else> 點擊注音可聽單字發音。 </template>
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
            <n-radio-button value="diacritic">變音符 â</n-radio-button>
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
            <n-radio-button value="letter">曲綫 a˦˥</n-radio-button>
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

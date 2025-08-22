<script setup lang="ts">
import { computed } from "vue";
import type { PossibilityData } from "@/library/reflex-table/relator";

import { NButton } from "naive-ui";

const { possibility, tableUrl } = defineProps<{
  possibility: PossibilityData;
  tableUrl: string;
}>();
const value = computed(() => possibility.value);
const frequency = computed(() => possibility.frequency);
const comment = computed(() => possibility.comment);

function openTable() {
  window.open(tableUrl, "_blank");
}
</script>

<template>
  <span class="block">
    <n-button @click="openTable" text>
      <span class="text" v-html="value"></span>
    </n-button>
    <table class="subsup">
      <tbody>
        <tr>
          <td>
            <span v-if="comment">{{ comment }}</span>
            <span v-else class="placeholder"></span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="frequency != 1" style="color: var(--dark-gray)">
              {{ Math.round(frequency * 100) }}%
            </span>
            <span v-else class="placeholder"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </span>
</template>

<style scoped>
.text {
  white-space: pre;
}

.block {
  display: inline-block;
  min-width: max-content;
  white-space: nowrap;
  margin: 0 0.2em;
}

.subsup {
  display: inline-table;
  vertical-align: middle;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
  margin-left: 0.1em;
}

.subsup td {
  text-align: left;
  border: none;
  line-height: 1em;
  font-size: 0.7em;
  padding: 0;
  margin: 0;
}

.placeholder {
  display: inline-block;
  height: 1em;
  width: 0;
}
</style>

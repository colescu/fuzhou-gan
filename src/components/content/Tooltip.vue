<script setup lang="ts">
import ConstrainedPopover from "../common/ConstrainedPopover.vue";
</script>

<template>
  <ConstrainedPopover trigger="hover">
    <template #trigger><sup>&dagger;</sup></template>

    <div class="footnote" style="max-width: 16em">
      <slot />
    </div>
  </ConstrainedPopover>
</template>

<style scoped></style>

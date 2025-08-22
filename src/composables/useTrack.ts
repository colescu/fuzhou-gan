import { computed, onMounted, onUnmounted, ref } from "vue";

// track if a type of component is mounted
function getTrackUtils() {
  const numTracked = ref<number>(0);

  function tracker() {
    onMounted(() => {
      numTracked.value += 1;
    });
    onUnmounted(() => {
      numTracked.value -= 1;
    });
  }

  const tracked = computed<boolean>(() => numTracked.value !== 0);

  return { tracked, tracker };
}

export const { tracked: hasBoth, tracker: trackHasBoth } = getTrackUtils();
export const { tracked: hasPhrase, tracker: trackHasPhrase } = getTrackUtils();
export const { tracked: hasSearch, tracker: trackHasSearch } = getTrackUtils();

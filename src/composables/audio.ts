import { onUnmounted, ref, watch, watchEffect, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useSettingsStore } from "../stores/settings";

function getAudioUrl(pronunciation: string): string {
  const tone = pronunciation[pronunciation.length - 1];
  const equivalentTone = ["0", "6"].includes(tone) ? "1" : tone;
  return `${
    process.env.NODE_ENV === "production" ? import.meta.env.BASE_URL : ""
  }/audio/${pronunciation.slice(0, -1) + equivalentTone}.wav`;
}

export function useAudio(pronunciation: string) {
  const audio = new Audio(getAudioUrl(pronunciation));
  audio.load();

  async function play() {
    try {
      await audio.play();
    } catch (error) {
      console.error(
        `Failed to load the audio file for ${pronunciation}`,
        error
      );
    }
  }

  return { play };
}

function useSequentialAudio(
  pronunciations: string[],
  delay: number,
  isPlaying: Ref<boolean>
) {
  const audios = pronunciations.map((pronunciation) =>
    pronunciation !== "" ? new Audio(getAudioUrl(pronunciation)) : null
  );

  async function preloadAll(): Promise<void> {
    await Promise.all(
      audios.map(
        (audio) =>
          new Promise<void>((resolve) => {
            if (!audio) return resolve();
            if (audio.readyState >= 4) return resolve(); // already loaded
            audio.addEventListener("canplaythrough", () => resolve(), {
              once: true,
            });
            audio.load();
          })
      )
    );
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  let index = 0;
  let stopped = false;

  function playNext() {
    if (stopped || index >= audios.length) {
      if (!stopped) {
        isPlaying.value = false;
      }
      return;
    }

    const audio = audios[index];
    if (audio !== null) {
      audio.play();
    }

    index++;
    timer = setTimeout(playNext, delay);
  }

  async function start() {
    stopped = false;
    index = 0;
    await preloadAll();

    if (!stopped) {
      isPlaying.value = true;
      playNext();
    }
  }

  function stop() {
    stopped = true;
    isPlaying.value = false;
    audios.forEach((audio) => {
      if (audio !== null) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  function toggleAudio() {
    if (isPlaying.value) {
      stop();
    } else {
      start();
    }
  }

  return { start, stop, toggleAudio };
}

export function useManagedSequentialAudio(
  pronunciationsRef: Ref<string[]>,
  isPlaying: Ref<boolean>
) {
  const router = useRouter();
  const settings = useSettingsStore();

  const sequentialAudio = ref<ReturnType<typeof useSequentialAudio> | null>();

  watchEffect((onCleanup) => {
    if (sequentialAudio.value) sequentialAudio.value.stop();

    sequentialAudio.value = useSequentialAudio(
      pronunciationsRef.value,
      settings.playSpeed,
      isPlaying
    );

    onCleanup(() => {
      if (sequentialAudio.value) sequentialAudio.value.stop();
    });
  });

  watch(
    () => router.currentRoute.value.fullPath,
    () => {
      if (sequentialAudio.value) sequentialAudio.value.stop();
    }
  );

  watch(
    () => settings.playSpeed,
    () => {
      if (sequentialAudio.value) sequentialAudio.value.stop();
    }
  );

  onUnmounted(() => {
    if (sequentialAudio.value) sequentialAudio.value.stop();
  });

  return {
    toggleAudio: () => sequentialAudio.value?.toggleAudio(),
  };
}

import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settings";
import { syllableUtils } from "@/library/lang-utils/syllable";
import type { RubyData } from "@/components/content/CharacterRuby.vue";

function getAudioUrl(
  pronunciation: string,
  sourceFormat: Format = "pinyin"
): string {
  const { show } = syllableUtils.FG;
  pronunciation = show(pronunciation, "ipaRaw", "ordinal", sourceFormat);
  const tone = pronunciation.slice(-1);
  const equivalentTone = ["0", "6"].includes(tone) ? "1" : tone;
  return `${import.meta.env.DEV ? "" : import.meta.env.BASE_URL}/audio/${
    pronunciation.slice(0, -1) + equivalentTone
  }.wav`;
}

export function useAudio(
  pronunciation: string,
  sourceFormat: Format = "pinyin"
) {
  const url = getAudioUrl(pronunciation, sourceFormat);
  const audio = new Audio(url);
  audio.preload = "auto";

  async function play() {
    try {
      await audio.play();
    } catch (error) {
      console.error(
        `Failed to load the audio file for ${pronunciation}:`,
        error
      );
    }
  }

  function stop() {
    audio.pause();
    audio.src = "";
    audio.load();
  }

  return { play, stop };
}

function useSequentialAudio(
  pronunciations: string[],
  delay: number,
  isPlaying: Ref<boolean>,
  sourceFormat: Format = "pinyin"
) {
  const audios = pronunciations.map((pronunciation) =>
    pronunciation !== ""
      ? new Audio(getAudioUrl(pronunciation, sourceFormat))
      : null
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

  // @ts-ignore
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
    if (audio != null) {
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
    audios.forEach((audio, index) => {
      if (audio != null) {
        audio.pause();
        audio.src = "";
        audio.load();
        audios[index] = null;
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
  phrase: Ref<RubyData[]>,
  sourceFormat: Format = "pinyin"
) {
  const route = useRoute();
  const settings = useSettingsStore();

  const pronunciations = computed<string[]>(() =>
    phrase.value.map((ruby) => ruby.pronunciation)
  );

  const sequentialAudio = ref<ReturnType<typeof useSequentialAudio> | null>();
  const isPlaying = ref<boolean>(false);

  watchEffect((onCleanup) => {
    if (sequentialAudio.value) sequentialAudio.value.stop();

    sequentialAudio.value = useSequentialAudio(
      pronunciations.value,
      settings.playSpeed,
      isPlaying,
      sourceFormat
    );

    onCleanup(() => {
      if (sequentialAudio.value) sequentialAudio.value.stop();
    });
  });

  watch(
    () => route.fullPath,
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
    isPlaying,
  };
}

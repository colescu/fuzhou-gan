import yaml from "js-yaml";
import { createCache } from "./factories/cache";
import { fetchFile } from "./factories/fetch";
import { entriesConst, fromEntriesConst } from "../common/object";

export const syllableDataCache = createCache(
  (part: "syllables" | "tones" | "all-parts" | "parts") => fetchFile(part)
);

function showMCInfo(this: any, parts: string[]): string {
  return parts.map((part) => this[part]).join("");
}

function toMCEntry(row: Omit<MCInfo, "音韻地位">): MCInfo {
  return { ...row, 音韻地位: showMCInfo };
}

export const mcCache = createCache<Record<number, MCEntry>>(
  () => fetchFile("MC"),
  (object: Record<number, Omit<MCEntry, "音韻地位">>) =>
    fromEntriesConst(
      entriesConst(object).map(([index, row]) => [
        index,
        { ...row, MC: toMCEntry(row.MC) },
      ])
    )
); // 小韻 data, indexed by 小韻號

function getMC(this: { 小韻號: number | null }): MCInfo | null {
  return this["小韻號"] != null
    ? mcCache.get()?.[this["小韻號"]]?.MC || null
    : null;
}

function toLangEntry(row: Omit<LangEntry, "讀音" | "MC">): LangEntry {
  return {
    ...row,
    字頭: row.字頭 ?? "□",
    讀音: row.記錄讀音 ?? row.推導讀音!,
    get MC() {
      return getMC.call(this);
    },
  };
}

export const dictionaryCache = createCache(
  (language: Language) => fetchFile(language),
  (array: Omit<LangEntry, "讀音" | "MC">[]) => array.map(toLangEntry)
);

export const variantsCache = createCache(
  () => fetchFile("variants", "txt"),
  (text: string) => text.split(/\r?\n/)
);

export const s2tCache = createCache(
  () =>
    fetchFile(
      "STCharacters",
      "txt",
      "https://raw.githubusercontent.com/BYVoid/OpenCC/refs/heads/master/data/dictionary"
    ),
  (text: string) =>
    Object.fromEntries(
      text
        .trim()
        .split(/\r?\n/)
        .map((row) => {
          const [s, ts, _] = row.split("\t");
          return [s, ts!.split(" ")];
        })
    )
);

export const yamlCache = createCache(
  (name: "characters" | "words") => fetchFile(name, "yaml"),
  (text: string) => yaml.load(text)
);

export async function initCoreData() {
  await Promise.all([
    mcCache.load(),
    dictionaryCache.load("FG"),
    variantsCache.load(),
    s2tCache.load(),
  ]);
}

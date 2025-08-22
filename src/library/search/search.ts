import {
  dictionaryCache,
  s2tCache,
  variantsCache,
} from "@/library/data/core-data";
import { getComparer } from "../common/sort-utils";

export function isChineseCharacter(char: string): boolean {
  const chineseRegex = /[\u4e00-\u9fff]/; // CJK ideographs
  const punctuationRegex = /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F]/; // CJK punctuation marks
  return chineseRegex.test(char) && !punctuationRegex.test(char);
}

function getVariants(char: string): string[] {
  const VARIANTS = variantsCache.get();
  let variants = [char];
  for (const row of VARIANTS) {
    if (row.includes(char)) {
      variants = row.split("");
      break;
    }
  }

  const S2T = s2tCache.get();
  const traditionals = S2T?.[char] ?? [];
  const charComparer = getComparer((c: string) => {
    if (c === char) return 0;
    if (traditionals.includes(c)) return 1;
    return 2;
  });

  return variants.sort(charComparer);
}

function getPriorityKey(entry: LangEntry): number[] {
  return [
    entry.訓作 ? -1 : 1,
    [
      "老",
      null,
      "新",
      "老白",
      "白",
      "老文",
      "文",
      "新文",
      "異",
      "變調",
      "官",
    ].indexOf(entry.層),
    entry.記錄讀音 ? -1 : 1,
    entry.小韻號 ?? Infinity,
  ];
}

export const langEntryComparer = getComparer(getPriorityKey);

// Gets ordered list of entries for variants of a given character
// no need to optimize
export function getLangEntries(
  char: string,
  language: Language = "FG"
): LangEntry[] {
  if (!isChineseCharacter(char)) return [];

  const DICTIONARY = dictionaryCache.get(language);
  const variants = getVariants(char);

  return variants
    .map((variant) =>
      DICTIONARY.filter((entry) => entry.字頭 === variant).sort(
        langEntryComparer
      )
    )
    .flat();
}

export function getSearchResultsByChars(
  chars: string[],
  language: Language,
  includePredicted: boolean = true
): number[] {
  const DICTIONARY = dictionaryCache.get(language);
  return [
    ...new Set(chars.map((char) => getLangEntries(char, language)).flat()),
  ]
    .filter((entry) => includePredicted || entry.記錄讀音)
    .map((entry) => DICTIONARY.indexOf(entry));
}

export function getSearchResultsByFilter(
  filter: (entry: LangEntry) => boolean,
  language: Language,
  includePredicted: boolean = true
): number[] {
  const DICTIONARY = dictionaryCache.get(language);
  return DICTIONARY.filter(
    (entry) => (includePredicted || entry.記錄讀音) && filter(entry)
  ).map((entry) => DICTIONARY.indexOf(entry));
}

import { mcCache } from "../data/core-data";
import { syllableUtils } from "../lang-utils/syllable";
import { getPart, partsUtils } from "../lang-utils/parts";
import type { Feature } from "./form-predict";

// TODO add more features
export const LANG_OPTIONS_MAP = {
  聲母: [{ value: "聲母" }],
  韻母: [
    { value: "韻母" },
    { value: "韻" },
    { value: "介音" },
    { value: "韻腹" },
    { value: "韻尾" },
  ],
  聲調: [{ value: "聲調" }],
} as const;
export const LANG_FIELDS = Object.values(LANG_OPTIONS_MAP)
  .flat()
  .map((option) => option.value);
export type LangField = (typeof LANG_FIELDS)[number];

export function getLangFeature(language: Language, field: LangField): Feature {
  const { parse } = syllableUtils[language];
  const { comparer } = partsUtils[language];

  function getter(entry: MCEntry): string {
    return getPart(parse(entry[language]!), field);
  }

  const values = [...new Set(Object.values(mcCache.get()).map(getter))].sort(
    comparer(field)
  );

  return {
    label: field,
    getter,
    values,
  };
}

Object.values(LANG_OPTIONS_MAP)
  .flat()
  .forEach((option) => {
    (option as any)["label"] = option.value;
  });

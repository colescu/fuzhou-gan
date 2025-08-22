import { syllableDataCache } from "../data/core-data";
import {
  computeOrdering,
  createSortComparerFromArray,
  createSortComparerFromArrays,
  precomposeComparer,
} from "../common/sort-utils";
import { isChineseCharacter } from "../search/search";
import { LANGUAGES } from "../constants/language";

const PARTS = ["聲母", "介音", "韻腹", "韻尾", "聲調", "韻", "韻母"] as const;
export type Part = (typeof PARTS)[number];

export function getPart(syllable: Syllable, part: Part): string {
  switch (part) {
    // use tuple to avoid parsing, but NSelect option has to be string
    case "韻":
      return JSON.stringify([syllable.韻腹, syllable.韻尾]);
    case "韻母":
      return JSON.stringify([syllable.介音, syllable.韻腹, syllable.韻尾]);
    default:
      return syllable[part];
  }
}

function getPartsUtils(
  language: Language,
  PARTS: any, // complicated
  ALL_PARTS: any,
  tones: {
    [tone: string]: { [label: string]: string };
  } = {}
) {
  // used in NSelect and ReflexTable
  // (from = "ipaRaw")
  function show(value: string, part: Part, format: Format): string {
    if (part !== "韻母") {
      if (part === "韻") {
        const tuple = JSON.parse(value);
        value = tuple.join("");
      }
      if (part === "聲調") {
        return value + " " + tones[value]!.name; // 例："0 輕聲"
      } else {
        // minimal manually written parts.json
        const foundValue = PARTS[format]?.[part]?.[value];
        if (foundValue) {
          if (typeof foundValue === "string") {
            return foundValue;
          } else if (foundValue[language]) {
            return foundValue[language];
          } else if (foundValue["other"]) {
            return foundValue["other"];
          }
        }
        return value;
      }
    } else {
      const tuple = JSON.parse(value);
      const medial = show(tuple[0], "介音", format);
      const rhyme = show(JSON.stringify([tuple[1], tuple[2]]), "韻", format);
      if (language === "PM" && format === "pinyin") {
        switch (medial + rhyme) {
          case "uen":
            return "uen (un)";
          case "uei":
            return "uei (ui)";
          case "iou":
            return "iou (iu)";
          case "ien":
            return "ien (ian)";
          case "üen":
            return "üen (üan)";
        }
      }
      return (medial === "無" ? "" : medial) + rhyme;
    }
  }

  function comparer(
    part: Part,
    orderingParts: Part[] = ["韻腹", "介音", "韻尾"]
  ) {
    const partsMap = {
      韻: ["韻腹", "韻尾"],
      韻母: ["介音", "韻腹", "韻尾"],
    };
    switch (part) {
      case "聲調":
        return undefined;
      case "韻":
      case "韻母":
        const parts = partsMap[part];
        return precomposeComparer(
          createSortComparerFromArrays(
            parts.map((part) => ALL_PARTS[part]),
            computeOrdering(parts, orderingParts)
          ),
          JSON.parse
        );
      default:
        return createSortComparerFromArray(ALL_PARTS[part]);
    }
  }

  return { show, comparer };
}

export let partsUtils = {} as Record<
  Language,
  ReturnType<typeof getPartsUtils>
>;

export async function initPartsUtils() {
  const TONES = await syllableDataCache.getAsync("tones");
  const PARTS = await syllableDataCache.getAsync("parts");
  const ALL_PARTS = await syllableDataCache.getAsync("all-parts");

  LANGUAGES.forEach((language) => {
    partsUtils[language] = getPartsUtils(
      language,
      PARTS,
      ALL_PARTS,
      TONES[language]
    );
  });
}

// ad hoc
export function renderPartsLabel(value: string, format: Format): string {
  if (isChineseCharacter(value.slice(-1))) {
    return value;
  }

  const className = format === "pinyin" ? "pinyin" : "ipa";

  // a (b)
  const regexParenthesis = /^([^\s]+) \(([^()]+)\)$/;
  const matchParenthesis = value.match(regexParenthesis);
  if (matchParenthesis) {
    const [, a, b] = matchParenthesis;
    return `<span class="${className}">${a}</span> (<span class="${className}">${b}</span>)`;
  }

  // a /b/
  const regexSlash = /^([^\s]+) \/([^\/]+)\/$/;
  const matchSlash = value.match(regexSlash);
  if (matchSlash) {
    const [, a, b] = matchSlash;
    return `<span class="pinyin">${a}</span> [<span class="ipa">${b}</span>]`;
  }

  return `<span class="${className}">${value}</span>`;
}

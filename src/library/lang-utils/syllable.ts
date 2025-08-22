import { syllableDataCache } from "../data/core-data";
import {
  getComparer,
  getIndexFinder,
  getStrictIndexFinder,
} from "../common/sort-utils";
import { fromEntriesConst } from "../common/object";
import { LANGUAGES } from "../constants/language";

function toSupDigits(digits: string): string {
  return digits.replace(/[0-9]/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c.charCodeAt(0) - 48]!);
}

function createConverter<R extends Record<string, unknown>>(
  data: R[],
  keyGetter: (value: unknown) => string = JSON.stringify
) {
  type Label = Extract<keyof R, string>;

  const indexMaps: {
    [K in Label]: (value: R[K]) => number;
  } = fromEntriesConst(
    (Object.keys(data[0]!) as Label[]).map((label) => [
      label,
      // ipaStrict not unique for JP, VN
      getStrictIndexFinder(
        data.map((item) => item[label]),
        keyGetter
      ),
    ])
  );

  function convert<F extends Label, T extends Label>(
    value: R[F],
    from: F,
    to: T
  ): R[T] {
    return data[indexMaps[from](value)]![to];
  }

  return convert;
}

function tupleToSyllable([
  聲母,
  介音,
  韻腹,
  韻尾,
  聲調 = "",
]: string[]): Syllable {
  return { 聲母, 介音, 韻腹, 韻尾, 聲調 } as Syllable;
}

const PARTS_NO_TONE = ["聲母", "介音", "韻腹", "韻尾"] as const;
type PartNoTone = (typeof PARTS_NO_TONE)[number];

function getSyllableUtils<F extends Exclude<string, "tuple"> = never>(
  syllables: ({
    tuple: [string, string, string, string];
  } & Record<"ipaRaw" | "ipaStrict" | "pinyin" | F, string>)[],
  tones: {
    [tone: string]: { [label: string]: string };
  } = {},
  ALL_PARTS: Record<PartNoTone, string[]>
) {
  type Format = "ipaRaw" | "ipaStrict" | "pinyin" | F;
  type Tone = keyof typeof tones;
  type ToneNotation = keyof (typeof tones)[Tone];

  const convert = createConverter(syllables);

  function parse(value: string, format: Format = "pinyin"): Syllable {
    try {
      const last = value.slice(-1);
      const hasTone = last >= "0" && last <= "9";

      return tupleToSyllable(
        hasTone
          ? // @ts-expect-error
            [...convert(value.slice(0, -1), format, "tuple"), last]
          : // @ts-expect-error
            [...convert(value, format, "tuple"), ""]
      );
    } catch (error) {
      console.error(`Error parsing ${value} in format ${format}:`, error);
      return tupleToSyllable([value, "", "", "", ""]);
    }
  }

  function show(
    value: string,
    to: Format,
    toneNotation: "ordinal" | ToneNotation = "ordinal",
    from: Format = "pinyin"
  ): string {
    if (toneNotation === "diacritic") {
      if (to !== "pinyin") {
        throw new Error("Diacritic tone notation is only for pinyin.");
      }
      if (tones?.[0]?.["diacritic"] === undefined) {
        throw new Error("Diacritic tone notation does not exist.");
      }
    }

    const tuple = parse(value, from);
    const syllable = convert(
      // @ts-expect-error
      PARTS_NO_TONE.map((part) => tuple[part]),
      "tuple",
      to
    );

    // JP, KR
    if (tuple["聲調"] === "" || Object.keys(tones).length === 0) {
      return syllable;
    }

    const tone = tuple.聲調 as Tone;
    const toneData = tones?.[tone] || {};

    if (toneNotation === "ordinal") {
      return syllable + tone;
    } else if (toneNotation === "diacritic") {
      const diacritic = toneData["diacritic"]!;

      // syllabic nasals
      if ([tuple.介音, tuple.韻腹, tuple.韻尾].every((item) => item === "")) {
        return syllable[0] + diacritic.normalize("NFKC") + syllable.slice(1);
      }

      // priority of vowels to put the diacritic
      const NUCLEUS = "aoêeüuiy";

      let position = syllable.length - 1;
      while (position >= 0 && !NUCLEUS.includes(syllable[position]!)) {
        position--;
      }
      if (position > 0) {
        const current = syllable[position]!,
          previous = syllable[position - 1]!;
        if (
          NUCLEUS.includes(previous) &&
          NUCLEUS.indexOf(previous) < NUCLEUS.indexOf(current) &&
          !(previous === "u" && current === "i")
        ) {
          position--;
        }
      }
      return (
        syllable.slice(0, position + 1) +
        diacritic +
        syllable.slice(position + 1)
      ).normalize("NFKC");
    } else {
      return syllable + toSupDigits(toneData[toneNotation]!);
    }
  }

  const indexFinderMap: Record<PartNoTone, (value: string) => number> =
    fromEntriesConst(
      (["聲母", "介音", "韻腹", "韻尾"] as const).map((part) => [
        part,
        getIndexFinder(ALL_PARTS[part]),
      ])
    );

  function comparer(
    format: Format = "pinyin"
  ): (a: string, b: string) => number {
    function getSortKey(value: string): number[] {
      const tuple = parse(value, format);
      return [
        ...(["聲母", "韻腹", "介音", "韻尾"] as const).map((part) =>
          indexFinderMap[part](tuple[part])
        ),
        Number(tuple.聲調),
      ];
    }
    return getComparer(getSortKey);
  }

  return { parse, show, comparer };
}

export let syllableUtils = {} as Record<
  Language,
  ReturnType<typeof getSyllableUtils>
>;

export async function initSyllableUtils() {
  const SYLLABLES = await syllableDataCache.getAsync("syllables");
  const TONES = await syllableDataCache.getAsync("tones");
  const ALL_PARTS = await syllableDataCache.getAsync("all-parts");

  syllableUtils = fromEntriesConst(
    LANGUAGES.map((language) => [
      language,
      getSyllableUtils(SYLLABLES[language], TONES[language], ALL_PARTS),
    ])
  );
}

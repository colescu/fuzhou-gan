import type {
  PhoneticAlphabet,
  IpaToneNotation,
  PinyinToneNotation,
} from "../stores/settings";
import EntryUtils from "./entryUtils";
import { getFormUtils, type Form } from "./formUtils";

export type FG = {
  聲母: string;
  介音: string;
  韻腹: string;
  韻尾: string;
  聲調: string;
};
export type FormFG = Form<FG>;

const IPA_TO_PINYIN_MAP: Record<string, Record<string, string>> = {
  聲母: {
    "": "",
    p: "b",
    pʰ: "p",
    m: "m",
    f: "f",
    t: "d",
    tʰ: "t",
    n: "n",
    l: "l",
    ts: "z",
    tsʰ: "c",
    s: "s",
    tɕ: "j",
    tɕʰ: "q",
    ɕ: "x",
    k: "g",
    kʰ: "k",
    ŋ: "ng",
    h: "h",
  },
  介音: {
    "": "",
    j: "i",
    w: "u",
    ɥ: "y",
  },
  韻腹: {
    "": "",
    a: "a",
    o: "o",
    ɛ: "e",
    i: "i",
    ɿ: "i",
    u: "u",
    y: "y",
  },
  韻尾: {
    "": "",
    m: "m", // 已消失 (> n)
    n: "n",
    ŋ: "ng",
    p: "p", // 已消失 (> t)
    t: "t",
    k: "k", // 已消失 (> ʔ)
    ʔ: "h",
    i: "i",
    u: "u",
  },
} as const;

const PINYIN_TO_IPA_MAP: Record<
  string,
  Record<string, string>
> = Object.fromEntries(
  Object.keys(IPA_TO_PINYIN_MAP).map((part) => [
    part,
    Object.fromEntries(
      Object.entries(IPA_TO_PINYIN_MAP[part]).map(([ipa, pinyin]) => [
        pinyin,
        ipa,
      ])
    ),
  ])
);

const CODA_STRICT_IPA_MAP: Record<string, string> = {
  p: "p",
  t: "t",
  k: "k",
  ʔ: "ʔ",
  i: "ɪ",
  u: "ʊ",
} as const;

const TONE_NOTATION_MAP: Record<string, Record<string, string>> = {
  0: { name: "輕聲", numeral: "", letter: "", diacritic: "" },
  1: { name: "陰平", numeral: "²²", letter: "˨", diacritic: "̄" },
  2: { name: "陽平", numeral: "²⁴", letter: "˨˦", diacritic: "́" },
  3: { name: "陰上", numeral: "⁴⁵", letter: "˦˥", diacritic: "̂" },
  // 陽上消失 (> 陽去)
  5: { name: "陰去", numeral: "⁵²", letter: "˥˨", diacritic: "̀" },
  6: { name: "陽去", numeral: "²²", letter: "˨", diacritic: "̄" }, // 新派混入陰平
  7: { name: "陰入", numeral: "²", letter: "˨", diacritic: "̄" },
  8: { name: "陽入", numeral: "⁵", letter: "˥", diacritic: "̂" },
} as const;

const CATEGORIES: FormFG = Object.fromEntries([
  ...Object.keys(IPA_TO_PINYIN_MAP).map((part) => [
    part,
    Object.keys(IPA_TO_PINYIN_MAP[part]),
  ]),
  ["聲調", Object.keys(TONE_NOTATION_MAP)],
]);

export const FGUtils = {
  // raw: tɕʰjau3  letter: tɕʰjaʊ˦˥  numeral: tɕʰjaʊ⁴⁵
  showIpa(syllable: FG, notation: IpaToneNotation): string {
    return [
      syllable.聲母,
      syllable.介音,
      syllable.韻腹,
      notation === "raw"
        ? syllable.韻尾
        : CODA_STRICT_IPA_MAP[syllable.韻尾] || syllable.韻尾,
      notation === "raw" && syllable.聲調 === "0"
        ? "0"
        : TONE_NOTATION_MAP[syllable.聲調]?.[notation] || "",
    ].join("");
  },

  // number: qiau3  diacritic: qiâu
  showPinyin(syllable: FG, notation: PinyinToneNotation): string {
    const toneDiacritic = TONE_NOTATION_MAP[syllable.聲調]?.diacritic || "";

    // syllabic ŋ
    if (syllable.聲母 === "ŋ" && syllable.韻腹 === "") {
      switch (notation) {
        case "diacritic":
          return ("n" + toneDiacritic).normalize("NFKC") + "g";
        case "number":
          return "ng" + syllable.聲調;
      }
    }

    const [initial, medial, nucleus, coda] = (
      ["聲母", "介音", "韻腹", "韻尾"] as (keyof FG)[]
    ).map((partName) => {
      const part = syllable[partName];
      return IPA_TO_PINYIN_MAP[partName][part] || part;
    });

    switch (notation) {
      case "number":
        return [initial, medial, nucleus, coda, syllable.聲調].join("");
      case "diacritic":
        return [
          initial,
          medial,
          (nucleus + toneDiacritic).normalize("NFKC"),
          coda,
        ].join("");
    }
  },

  // Parses raw IPA to FG
  parseIpa(text: string): FG {
    let initialLength = 3;
    while (
      initialLength > 0 &&
      !(text.slice(0, initialLength) in IPA_TO_PINYIN_MAP.聲母)
    ) {
      initialLength -= 1;
    }
    const initial = text.slice(0, initialLength);

    function parseRhyme(text: string): [string, string, string] {
      switch (text.length) {
        case 3:
          return [text[0], text[1], text[2]];
        case 2:
          if (
            text[1] in IPA_TO_PINYIN_MAP.韻尾 &&
            !["ju", "wi"].includes(text)
          ) {
            return ["", text[0], text[1]];
          } else {
            return [text[0], text[1], ""];
          }
        case 1:
          return ["", text[0], ""];
        default:
          return ["", text, ""];
      }
    }

    const [medial, nucleus, coda] = parseRhyme(text.slice(initialLength, -1));
    const tone = text[text.length - 1];

    return {
      聲母: initial,
      介音: medial,
      韻腹: nucleus,
      韻尾: coda,
      聲調: tone,
    };
  },

  // Converts raw IPA to displayed text
  showPronunciation(
    text: string,
    settings: {
      phoneticAlphabet: PhoneticAlphabet;
      pinyinToneNotation: PinyinToneNotation;
      ipaToneNotation: IpaToneNotation;
    }
  ): string {
    const syllable = this.parseIpa(text);
    switch (settings.phoneticAlphabet) {
      case "ipa":
        return this.showIpa(syllable, settings.ipaToneNotation);
      case "pinyin":
        return this.showPinyin(syllable, settings.pinyinToneNotation);
    }
  },
};

export const FormFGUtils = getFormUtils<FG, string>(
  CATEGORIES,
  (entry, item) => FGUtils.parseIpa(EntryUtils.getFG(entry))[item]
);
FormFGUtils.getOptionLabel =
  (item, phoneticAlphabet: PhoneticAlphabet) => (option) => {
    if (item === "聲調") {
      return option + " " + TONE_NOTATION_MAP[option]?.name;
    } else {
      switch (phoneticAlphabet) {
        case "ipa":
          return option || "無";
        case "pinyin":
          if (item === "韻腹") {
            switch (option) {
              case "i":
                return "i [i]";
              case "ɿ":
                return "i [ɿ]";
            }
          }
          return IPA_TO_PINYIN_MAP[item]?.[option] || "無";
      }
    }
  };

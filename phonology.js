const IPA_TO_PINYIN = {
  initial: {
    // 聲母
    p: "b",
    pʰ: "p",
    m: "m",
    f: "f",
    t: "d",
    tʰ: "t",
    n: "n",
    l: "l",
    k: "g",
    kʰ: "k",
    ŋ: "ng",
    h: "h",
    tɕ: "j",
    tɕʰ: "q",
    ɕ: "x",
    ts: "z",
    tsʰ: "c",
    s: "s",
  },
  medial: {
    // 介音
    j: "i",
    w: "u",
    ɥ: "ü",
  },
  nucleus: {
    // 韻腹（主元音）
    a: "a",
    o: "o",
    ɛ: "e",
    i: "i",
    ɿ: "i",
    u: "u",
    y: "ü", // 多見於新派
  },
  coda: {
    // 韻尾
    p: "p", // 幾乎消失 (> t)
    t: "t",
    k: "k", // 已消失 (> ʔ)
    ʔ: "h",
    m: "m", // 幾乎消失 (> n)
    n: "n",
    ŋ: "ng",
  },
};

const TONE_CHART = {
  1: { name: "陰平", numeral: 22, letter: "˨", diacritic: "̄" },
  2: { name: "陽平", numeral: 24, letter: "˨˦", diacritic: "́" },
  3: { name: "陰上", numeral: 45, letter: "˦˥", diacritic: "̂" },
  // 陽上消失 (> 陽去)
  5: { name: "陰去", numeral: 52, letter: "˥˨", diacritic: "̀" },
  6: { name: "陽去", numeral: 22, letter: "˨", diacritic: "̄" }, // 新派混入陰平
  7: { name: "陰入", numeral: 2, letter: "˨", diacritic: "̄" },
  8: { name: "陽入", numeral: 5, letter: "˥", diacritic: "̂" },
};

export default class Syllable {
  static PARTS = ["initial", "medial", "nucleus", "coda"];

  constructor(initial, medial, nucleus, coda, tone) {
    Object.assign(this, { initial, medial, nucleus, coda, tone });
  }

  showIPA(notation) {
    return (
      Syllable.PARTS.map((part) => this[part]).join("") +
        TONE_CHART[this.tone]?.[notation] || ""
    );
  }

  showPinyin() {
    const toneDiacritic = TONE_CHART[tone]?.diacritic || "";
    return Syllable.PARTS.map((part) => {
      const pinyin = IPA_TO_PINYIN[part]?.[this[part]] || "";
      if (part === "nucleus") {
        return (pinyin + toneDiacritic).normalize("NFKC");
      } else {
        return pinyin;
      }
    }).join("");
  }
}

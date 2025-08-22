export {};

declare global {
  type Language = "FG" | "PM" | "GC" | "SW";

  // Core data types

  type MCInfo = {
    字: string; // 代表字
    反切: string | null; // 例：德紅切
    音韻地位: (parts: string[]) => string; // 例：端通東一平
    聲母: string; // 例：端
    清濁: string; // 例：全清
    音: string; // 例：舌
    組: string; // 例：端
    攝: string; // 例：通
    韻系: string; // 例：東
    等: string; // 例：一
    呼: "開" | "合" | "";
    重紐: "A" | "B" | null;
    聲調: string; // 例：平
  };
  type MCEntry = {
    字數: number;
    MC: MCInfo;
  } & Record<Language, string | null>; // expected reflex in pinyin

  // "Lang" is placeholder for Language
  type LangEntry = {
    字頭: string;
    讀音: string; // 記錄讀音 || 推導讀音, in pinyin
    記錄讀音: string | null;
    推導讀音: string | null;
    層: string | null;
    訓作: string | null;
    釋義: string | null;
    廣韻釋義: string | null;
    小韻號: number | null;
    MC: MCInfo | null;
  };

  type Syllable = {
    聲母: string;
    介音: string;
    韻腹: string;
    韻尾: string;
    聲調: string;
  };

  // settings

  type Format = "ipaRaw" | "ipaStrict" | "pinyin";
  type PinyinToneNotation = "ordinal" | "diacritic";
  type IpaToneNotation = "raw" | "letter" | "number";
}

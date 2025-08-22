import { syllableDataCache } from "../data/core-data";

// Separates tone from pinyin
// ad hoc
export function normalizePinyin(
  pinyin: string,
  language: Language
): [string, string] {
  if (!["FG", "PM"].includes(language) || !isNaN(Number(pinyin.slice(-1)))) {
    return [pinyin.slice(0, -1).normalize("NFKC"), pinyin.slice(-1)];
  }

  const TONE_DATA: Record<string, { diacritic: string }> =
    syllableDataCache.get("tones")[language];
  const DIACRITIC_MAP = Object.fromEntries(
    Object.entries(TONE_DATA).map(([tone, data]) => [data["diacritic"], tone])
  );

  let text = pinyin.normalize("NFKD");
  let tone = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i]! in DIACRITIC_MAP) {
      tone = DIACRITIC_MAP[text[i]!]!;
      text = text.slice(0, i) + text.slice(i + 1);
      break;
    }
  }

  if (language === "FG") {
    if (text !== "" && !"th".includes(text.at(-1)!)) {
      if (tone === "8") tone = "3";
      if (tone === "7") tone = "16";
    }
  }

  return [text.normalize("NFKC"), tone];
}

export async function fetchCharsByPM(pinyin: string): Promise<string[]> {
  const [syllable, tone] = normalizePinyin(pinyin, "PM");

  const chars: string[] = [];

  const response = await fetch(
    "https://raw.githubusercontent.com/mozillazg/pinyin-data/refs/heads/master/kXHC1983.txt"
  );
  const text = await response.text();

  const rows = text.split("\n");
  for (const row of rows) {
    const [_, pinyins, character] = row.split(/[:#]/).map((s) => s.trim());
    if (!character || !pinyins) continue;
    const pronunciations = pinyins.split(",");
    for (const pronunciation of pronunciations) {
      const [currentSyllable, currentTone] = normalizePinyin(
        pronunciation,
        "PM"
      );
      if (
        currentSyllable === syllable &&
        (tone === "" || currentTone === tone)
      ) {
        chars.push(character);
        break;
      }
    }
  }

  return chars;
}

export async function fetchCharsByGC(pinyin: string): Promise<string[]> {
  let tone = "";
  if (!isNaN(Number(pinyin.slice(-1)))) {
    tone = pinyin.slice(-1);
    pinyin = pinyin.slice(0, -1);
  }

  const chars: string[] = [];

  const response = await fetch(
    "https://raw.githubusercontent.com/jyutnet/cantonese-books-data/refs/heads/master/2004_%E5%BB%A3%E5%B7%9E%E8%A9%B1%E6%AD%A3%E9%9F%B3%E5%AD%97%E5%85%B8/B01_%E8%B3%87%E6%96%99.json"
  );
  const json = await response.json();

  for (const entry of json) {
    let found = false;
    for (const item of entry["義項"]) {
      for (const pronunciation of item["讀音"]) {
        if (
          pronunciation["粵拼讀音"] &&
          pronunciation["粵拼讀音"].slice(0, -1) === pinyin &&
          (tone === "" || pronunciation["粵拼讀音"].slice(-1) === tone)
        ) {
          found = true;
        }
      }
    }
    if (found) {
      chars.push(...entry["字頭"]);
    }
  }

  return chars;
}

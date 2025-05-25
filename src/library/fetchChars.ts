const PINYIN_TONE_MAP: Record<string, string> = {
  "̄": "1",
  "́": "2",
  "̌": "3",
  "̀": "4",
} as const;

// Separates tone from PM Pinyin
function normalizePinyin(pinyin: string): [string, string] {
  if (!isNaN(Number(pinyin.slice(-1)))) {
    return [pinyin.slice(0, -1).normalize("NFKC"), pinyin.slice(-1)];
  } else {
    const text = pinyin.normalize("NFKD");
    for (let i = 0; i < text.length; i++) {
      if (text[i] in PINYIN_TONE_MAP) {
        return [
          (text.slice(0, i) + text.slice(i + 1)).normalize("NFKC"),
          PINYIN_TONE_MAP[text[i]],
        ];
      }
    }
    return [pinyin.normalize("NFKC"), ""];
  }
}

export async function fetchCharsByPM(pinyin: string): Promise<string[]> {
  const [syllable, tone] = normalizePinyin(pinyin);

  const chars = [] as string[];

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
      const [syllableEntry, toneEntry] = normalizePinyin(pronunciation);
      if (syllableEntry === syllable && (tone === "" || toneEntry === tone)) {
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

  const chars = [] as string[];

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

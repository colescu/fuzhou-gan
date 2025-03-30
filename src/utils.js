export function isChineseCharacter(char) {
  const chineseRegex = /[\u4e00-\u9fff]/; // CJK ideographs
  const punctuationRegex = /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F]/; // CJK punctuation marks
  return chineseRegex.test(char) && !punctuationRegex.test(char);
}

function getVariants(character) {
  const variants = new Set([character]);
  if (character in window.S2T) {
    variants.add(...window.S2T[character]);
  }
  if (character in window.T2S) {
    window.T2S[character].forEach((item) => {
      if (item in window.S2T) {
        variants.add(...window.S2T[item]);
      }
    });
  }
  return variants;
}

export function getPronunciation(character) {
  if (!isChineseCharacter(character)) return [];

  const variants = getVariants(character);
  let pronunciations = [];
  variants.forEach((variant) => {
    if (variant in window.DICTIONARY) {
      pronunciations = pronunciations.concat(window.DICTIONARY[variant]);
    }
  });
  return pronunciations;
}

// 處理簡繁轉換、異體字

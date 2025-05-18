export function isChineseCharacter(char: string): boolean {
  const chineseRegex = /[\u4e00-\u9fff]/; // CJK ideographs
  const punctuationRegex = /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F]/; // CJK punctuation marks
  return chineseRegex.test(char) && !punctuationRegex.test(char);
}

import { initPartsUtils } from "./parts";
import { initSyllableUtils } from "./syllable";

export async function initLangUtils() {
  await Promise.all([initSyllableUtils(), initPartsUtils()]);
}

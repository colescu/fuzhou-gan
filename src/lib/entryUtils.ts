import { isChineseCharacter } from "./utils";

const EntryUtils = {
  isPredicted(entry: Entry): boolean {
    return entry.撫州話 === "";
  },

  getFG(entry: Entry): string {
    return entry.撫州話 || entry.推導撫州話;
  },

  // Gets ordered list of entries for variants of a given character
  // no need to optimize
  getEntries(char: string, includePredicted: boolean): Entry[] {
    if (!isChineseCharacter(char)) return [];

    const dictionary = window.DICTIONARY;
    const variants = window.VARIANTS_MAP[char] || [char];

    function priorityKey(entry: Entry): number {
      if (entry.訓作 !== "") {
        return -2;
      } else if (entry.文白新 === "白") {
        return -1;
      } else if (entry.撫州話 === "") {
        return 1;
      }
      return 0;
    }

    // variants map is already sorted
    return variants
      .map((variant) =>
        dictionary
          .filter((entry) => entry.字頭 === variant)
          .sort((a, b) => priorityKey(a) - priorityKey(b))
      )
      .flat()
      .filter((entry) => includePredicted || !EntryUtils.isPredicted(entry));
  },
};

export default EntryUtils;

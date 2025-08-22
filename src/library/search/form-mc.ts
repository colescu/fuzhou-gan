import { mcCache } from "../data/core-data";
import { getFormUtils } from "./form-utils";
import { fromEntriesConst } from "../common/object";
import { createSortComparerFromArray } from "../common/sort-utils";
import { MC_CATEGORIES } from "../constants/MC";

const ITEMS = [
  "聲母",
  "清濁",
  "音",
  "組",
  "攝",
  "韻系",
  "等",
  "呼",
  "聲調",
] as const;
type Item = (typeof ITEMS)[number];
type MC = Record<Item, string>;

export function getFormMCUtils() {
  return getFormUtils<MC, MCInfo>(
    Object.values(mcCache.get()).map((entry) => entry.MC),
    fromEntriesConst(
      ITEMS.map((item) => [item, (syllable: MCInfo) => syllable[item]])
    ),
    fromEntriesConst(
      ITEMS.map((item) => [
        item,
        createSortComparerFromArray([...MC_CATEGORIES[item]]),
      ])
    )
  );
}

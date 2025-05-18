export type Form<T> = {
  [K in keyof T]: T[K][];
};

interface FormUtils<T> {
  ITEMS: (keyof T)[];
  OPTIONS: Form<T>;

  getItemLabel?: (item: keyof T, ...rest: any[]) => string;
  getOptionLabel?: (
    item: keyof T,
    ...rest: any[]
  ) => (option: string) => string;

  getEmptyForm: () => Form<T>;

  getChecker: (form: Form<T>) => (entry: Entry) => boolean;
  computeOptions: (form: Form<T>) => Form<T>;
}

export function getFormUtils<
  T extends Record<string, string>,
  K extends T[keyof T]
>(
  ALL_OPTIONS: Form<T>,
  getter: (entry: Entry, item: keyof T) => K
): FormUtils<T> {
  const ITEMS = Object.keys(ALL_OPTIONS) as (keyof T)[];
  return {
    ITEMS: ITEMS,
    OPTIONS: ALL_OPTIONS,

    getEmptyForm: () =>
      Object.fromEntries(
        ITEMS.map((item) => [item, [] as string[]])
      ) as Form<T>,

    getChecker: (form) => (entry) =>
      ITEMS.every(
        (item) =>
          form[item].length === 0 || form[item].includes(getter(entry, item))
      ),

    // Get the possible options based on the other items
    // speed is acceptable
    computeOptions(form) {
      const options = Object.fromEntries(
        ITEMS.map((item) => [item, new Set() as Set<string>])
      ) as { [K in keyof T]: Set<T[K]> };
      for (const entry of window.DICTIONARY) {
        let badItem: keyof T | null = null,
          bad = false;
        for (const item of ITEMS) {
          if (
            !(
              form[item].length === 0 ||
              form[item].includes(getter(entry, item))
            )
          ) {
            if (badItem === null) {
              badItem = item;
            } else {
              bad = true;
              break;
            }
          }
        }
        if (!bad) {
          if (badItem === null) {
            for (const item of ITEMS) {
              options[item].add(getter(entry, item));
            }
          } else {
            options[badItem].add(getter(entry, badItem));
          }
        }
      }
      return Object.fromEntries(
        ITEMS.map((item) => [
          item,
          ALL_OPTIONS[item].filter((option) => options[item].has(option)),
        ])
      ) as Form<T>;
    },
  };
}

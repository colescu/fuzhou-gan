export function fromEntriesConst<
  T extends readonly (readonly [PropertyKey, any])[]
>(
  entries: T
): { [K in T[number][0]]: Extract<T[number], readonly [K, any]>[1] } {
  return Object.fromEntries(entries) as any;
}

export function keysConst<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function entriesConst<T extends object>(
  obj: T
): readonly (readonly [keyof T, T[keyof T]])[] {
  return Object.entries(obj) as unknown as readonly (readonly [
    keyof T,
    T[keyof T]
  ])[];
}

export function pick<T, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  return fromEntriesConst(keys.map((key) => [key, obj[key]])) as Pick<T, K>;
}

export function cartesianProduct<T extends readonly unknown[][]>(
  ...arrays: T
): Array<{ [K in keyof T]: T[K] extends readonly (infer U)[] ? U : never }> {
  type ResultTuple = {
    [K in keyof T]: T[K] extends readonly (infer U)[] ? U : never;
  };
  let result: ResultTuple[] = [[]] as ResultTuple[];
  arrays.forEach((array) => {
    result = result.flatMap((prefix) =>
      array.map((item) => [...prefix, item] as ResultTuple)
    );
  });
  return result;
}

export function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

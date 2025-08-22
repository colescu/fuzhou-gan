import { mcCache } from "../data/core-data";

export type PossibilityData = {
  value: string;
  frequency: number;
  comment: string;
};

export type ColumnData = {
  [value: string]: PossibilityData[];
}; // valueX: possibilitiesY

function getTotalNumber(entries: MCEntry[]): number {
  return entries.map((entry) => entry.字數).reduce((val, acc) => acc + val, 0);
}

export class Relator<X extends string, Y extends string> {
  constructor(
    private readonly getX: (entry: MCEntry) => X,
    private readonly getY: (entry: MCEntry) => Y,
    private readonly getComment: (x: X, y: Y) => string
  ) {}

  private get data(): Record<X, Record<Y, MCEntry[]>> {
    const data = {} as Record<X, Record<Y, MCEntry[]>>;
    for (const entry of Object.values(mcCache.get())) {
      const x = this.getX(entry),
        y = this.getY(entry);
      if (!(x in data)) {
        data[x] = {} as Record<Y, MCEntry[]>;
      }
      if (!(y in data[x])) {
        data[x][y] = [];
      }
      data[x][y].push(entry);
    }
    return data;
  }

  get columnData(): ColumnData {
    return Object.fromEntries(
      (Object.entries(this.data) as [X, Record<Y, MCEntry[]>][]).map(
        ([x, values]) => {
          const total = getTotalNumber(
            Object.values(values).flat() as MCEntry[]
          );
          return [
            x,
            (Object.entries(values) as [Y, MCEntry[]][])
              .map(([y, entries]) => ({
                value: y,
                frequency: getTotalNumber(entries) / total,
                comment: this.getComment(x, y),
              }))
              .sort((pos1, pos2) => pos2.frequency - pos1.frequency),
          ];
        }
      )
    );
  }
}

export function computeGridOffset(
  totalItems: number,
  itemsPerRow: number
): number {
  const nextItemIndex = totalItems + 1;
  const remainder = nextItemIndex % itemsPerRow;
  const offset = (itemsPerRow - remainder) % itemsPerRow;
  return offset;
}

export function computeRowSpan<T>(data: T[][]): number[][] {
  const rows = data.length;
  if (rows === 0) return [];
  const cols = data[0]!.length;

  const rowSpans: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(1));

  for (let col = 0; col < cols; col++) {
    let start = 0;
    while (start < rows) {
      let end = start + 1;
      while (end < rows && data[end]![col] === data[start]![col]) {
        end++;
      }
      const span = end - start;
      rowSpans[start]![col] = span;
      for (let i = start + 1; i < end; i++) {
        rowSpans[i]![col] = 0;
      }
      start = end;
    }
  }

  return rowSpans;
}

import { createCache } from "./factories/cache";

export function getDateToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseChineseDate(str: string): Date | undefined {
  const match = str
    .trim()
    .match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (!match) return undefined;
  const [_, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function toChineseDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const parts = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const year = parts.find((p) => p.type === "year")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";

  return `${year} 年 ${month} 月 ${day} 日`;
}

async function fetchLastUpdate() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_DATA_URL}/last-update.txt`
    );
    const text = await response.text();
    return parseChineseDate(text);
  } catch (error) {
    console.error("Error fetching the last update date:", error);
    return undefined;
  }
}

export const lastUpdateCache = createCache(fetchLastUpdate);

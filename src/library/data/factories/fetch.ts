import { getFromDB, putToDB } from "./db";
import { lastUpdateCache } from "../date";

export async function fetchFile(
  filename: string,
  format: "json" | "txt" | "csv" | "tsv" | "yaml" = "json",
  baseUrl: string = import.meta.env.VITE_DATA_URL
) {
  const key = `${filename}.${format}`;
  const url = `${baseUrl}/${key}`;

  const lastUpdate = await lastUpdateCache.getAsync();

  try {
    const cached = await getFromDB(key);
    if (cached && cached.timestamp === lastUpdate?.getTime()) {
      return cached.data;
    }
  } catch (error) {
    console.error("Error fetching from DB:", error);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} when fetching ${key}`);
  }

  const data =
    format === "json" ? await response.json() : await response.text();

  try {
    if (lastUpdate) {
      await putToDB({ key, data, timestamp: lastUpdate.getTime() });
    } else {
      console.warn("Unknown last update date, skipping DB save.");
    }
  } catch (error) {
    console.error("Error saving to DB:", error);
  }

  console.log(`Successfully fetched ${key}`);

  return data;
}

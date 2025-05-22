import Papa from "papaparse";

export const BASE_URL =
  "https://raw.githubusercontent.com/colescu/fuzhou-gan-backend/refs/heads/main";

async function fetchDictionary() {
  try {
    const response = await fetch(`${BASE_URL}/data/dictionary.csv`);
    const csvText = await response.text();
    const dictionary = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    }).data as Entry[];
    window.DICTIONARY = dictionary;
    console.log("Successfully fetched the dictionary.");
  } catch (error) {
    console.error("Error fetching the dictionary:", error);
    alert("錯誤：未能獲取撫州話字典！");
  }
}

function parseVariantsMap(text: string): { [key: string]: string[] } {
  const variantsMap = {} as { [key: string]: string[] };
  for (const row of text.split(/\r?\n/)) {
    if (row !== "") {
      const [character, variants = ""] = row.split(",");
      variantsMap[character] = variants.split("|") || [];
    }
  }
  return variantsMap;
}

async function fetchVariantsMap() {
  try {
    const response = await fetch(`${BASE_URL}/data/variants.csv`);
    const text = await response.text();
    const variantsMap = parseVariantsMap(text);
    window.VARIANTS_MAP = variantsMap;
    console.log("Successfully fetched the variants map.");
  } catch (error) {
    console.error("Error fetching the variants map:", error);
    alert("錯誤：未能獲取簡繁轉換映射！");
  }
}

export default async function fetchData() {
  await Promise.all([fetchDictionary(), fetchVariantsMap()]);
}

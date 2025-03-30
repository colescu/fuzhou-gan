import Syllable from "./src/Syllable.js";
import Interlinear from "./src/Interlinear.js";
import { getPronunciation } from "./src/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchDictionary();
  fetchSTConversionMaps();

  // add event listener on input box
  const input = document.getElementById("input");
  input.addEventListener("input", () => {
    document.getElementById("output").innerHTML = "";
    input.value.split("").forEach((character, index) => {
      new Interlinear("output", index, character, getPronunciation(character));
    });
  });
});

function fetchDictionary() {
  fetch(
    "https://colescu.github.io/fuzhou-gan-online-dictionary/data/dictionary.csv"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      window.DICTIONARY = parseDictionary(text);
    })
    .catch((error) => {
      console.error("Error fetching the dictionary:", error);
      alert("錯誤：未能獲取撫州話字典。");
    });
}

function parseDictionary(csvText) {
  const dictionary = {};
  const rows = csvText.split("\n").slice(1);
  for (const row of rows) {
    const entry = row.split(",");
    const [character, ...syllableData] = entry;
    const comment = syllableData.pop();
    dictionary[character] = dictionary[character] || [];
    dictionary[character].push({
      character: character,
      syllable: new Syllable(...syllableData),
      comment: comment,
    });
  }
  return dictionary;
}

function fetchSTConversionMaps() {
  const url =
    "https://raw.githubusercontent.com/BYVoid/OpenCC/refs/heads/master/data/dictionary";
  fetch(`${url}/STCharacters.txt`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      window.S2T = parseConversionMap(text);
    })
    .catch((error) => {
      console.error(
        "Error fetching the simplified-to-traditional conversion map:",
        error
      );
    });
  fetch(`${url}/TSCharacters.txt`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      window.T2S = parseConversionMap(text);
    })
    .catch((error) => {
      console.error(
        "Error fetching the traditional-to-simplified conversion map:",
        error
      );
    });
}

function parseConversionMap(tsvText) {
  const conversionMap = {};
  const rows = tsvText.split("\n");
  for (const row of rows) {
    if (row.trim() === "") continue;
    const entry = row.split("\t");
    const [before, after] = entry;
    conversionMap[before] = after.split(" ");
  }
  return conversionMap;
}

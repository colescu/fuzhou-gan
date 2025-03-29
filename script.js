import Syllable from "./phonology.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://colescu.github.io/data.csv") // TODO
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      window.DICTIONARY = parseDictionary(text);
      sessionStorage.setItem("dictionary", JSON.stringify(window.dictionary));
    })
    .catch((error) => {
      console.error("Error fetching the dictionary:", error);
      alert("錯誤：未能獲取撫州話字典。");
    });
});

function parseDictionary(csvText) {
  const dictionary = {};
  const rows = csvText.split("\n").slice(1);
  for (const row of rows) {
    const entry = row.split(",");
    const [character, ...syllableData] = entry;
    const comment = syllableData.pop();
    dictionary[character] = dictionary[character] || [];
    dictionary[character].push({
      syllable: new Syllable(...syllableData),
      comment: comment,
    });
  }
  return dictionary;
}

function getPronunciation(x) {
  if (!window.DICTIONARY) {
    window.DICTIONARY = JSON.parse(sessionStorage.dictionary);
  }
  const pronunciations = window.DICTIONARY[x];
  if (!pronunciations) {
    return "無";
  } else {
    return pronunciations[0]["syllable"]; // TODO
  }
}

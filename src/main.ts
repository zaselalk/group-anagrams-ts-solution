import groupAnagrams from "./anagrams";
import "./style.css";

const PRESETS = [
  ["eat", "tea", "tan", "ate", "nat", "bat"],
  ["abc", "bca", "cab", "xyz", "zyx", "hello"],
  ["a"],
];

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <header>
    <h1>Group Anagrams</h1>
    <p>Enter a list of words to group them by their anagram key.</p>
  </header>

  <div class="input-card">
    <div class="input-row">
      <input
        id="words-input"
        type="text"
        placeholder='e.g. eat, tea, tan, ate, nat, bat'
        autocomplete="off"
        spellcheck="false"
      />
      <button id="run-btn">Group</button>
    </div>
    <p class="hint">Separate words with commas or spaces.</p>
    <div class="presets">
      <span>Try:</span>
      ${PRESETS.map((p, i) => `<button class="preset-btn" data-index="${i}">${p.join(", ")}</button>`).join("")}
    </div>
  </div>

  <div id="results">
    <div class="empty-state">Enter some words above and click <strong>Group</strong>.</div>
  </div>
`;

const input = document.querySelector<HTMLInputElement>("#words-input")!;
const resultsEl = document.querySelector<HTMLDivElement>("#results")!;

function parseWords(raw: string): string[] {
  return raw
    .split(/[\s,]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0);
}

function renderResults(words: string[]): void {
  if (words.length === 0) {
    resultsEl.innerHTML = `<div class="empty-state">No valid words found. Try typing something!</div>`;
    return;
  }

  let groups: string[][];
  try {
    groups = groupAnagrams(words);
  } catch (err) {
    resultsEl.innerHTML = `<div class="error-state">Something went wrong: ${String(err)}</div>`;
    return;
  }

  const cardsHTML = groups
    .map((group, i) => {
      const colorClass = `color-${i % 8}`;
      const sortedKey = group[0].split("").sort().join("");
      const chips = group
        .map((w) => `<span class="chip ${colorClass}">${w}</span>`)
        .join("");
      return `
        <div class="group-card" style="animation-delay:${i * 40}ms">
          <span class="key-label">Anagram key</span>
          <span class="sorted-key">${sortedKey}</span>
          <div class="word-chips">${chips}</div>
        </div>`;
    })
    .join("");

  resultsEl.innerHTML = `
    <div class="results-header">
      <h2>Results</h2>
      <span class="results-count">${groups.length} group${groups.length !== 1 ? "s" : ""}</span>
    </div>
    <div class="groups-grid">${cardsHTML}</div>
  `;
}

document
  .querySelector<HTMLButtonElement>("#run-btn")!
  .addEventListener("click", () => {
    renderResults(parseWords(input.value));
  });

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") renderResults(parseWords(input.value));
});

document.querySelectorAll<HTMLButtonElement>(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = Number(btn.dataset.index);
    input.value = PRESETS[idx].join(", ");
    renderResults(parseWords(input.value));
  });
});

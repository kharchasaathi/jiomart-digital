import { getState } from "../core/state.js";

/* ===============================
   DOM
================================ */
const highlightInput = document.getElementById("highlightInput");
const addHighlightBtn = document.getElementById("addHighlightBtn");
const highlightsList = document.getElementById("highlightsList");

/* ===============================
   INIT DRAFT
================================ */
const state = getState();
state.currentProduct ||= {};
state.currentProduct.highlights ||= [];
state.currentProduct.specs ||= {};

/* ===============================
   ADD HIGHLIGHT
================================ */
addHighlightBtn.addEventListener("click", () => {
  const text = highlightInput.value.trim();
  if (!text) return;

  state.currentProduct.highlights.push(text);
  highlightInput.value = "";

  renderHighlights();
});

/* ===============================
   RENDER HIGHLIGHTS
================================ */
function renderHighlights() {
  highlightsList.innerHTML = "";

  state.currentProduct.highlights.forEach((h, index) => {
    const li = document.createElement("li");
    li.textContent = h;

    li.onclick = () => {
      state.currentProduct.highlights.splice(index, 1);
      renderHighlights();
    };

    highlightsList.appendChild(li);
  });
}

/* ===============================
   SPEC INPUTS
================================ */
[
  "specBrand",
  "specCategory",
  "specWarranty",
  "specDelivery",
  "specInstallation"
].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("input", () => {
    state.currentProduct.specs[id.replace("spec", "").toLowerCase()] =
      el.value;
  });
});

/***************************************************
 * ADMIN TEXT TOOLBAR – FINAL (BLOCK ATTACHED)
 * ✔ Toolbar appears BELOW active block
 * ✔ NO floating / NO absolute
 * ✔ Same as OLD BACKUP behaviour
 ***************************************************/

import { getActiveBlock, getState } from "../core/state.js";

let toolbar;

/* ===============================
   CREATE TOOLBAR
================================ */
function createToolbar() {
  if (toolbar) return;

  toolbar = document.createElement("div");
  toolbar.className = "admin-text-toolbar";

  toolbar.innerHTML = `
    <input type="number" min="10" max="80" title="Font size" />
    <input type="color" title="Text color" />

    <select title="Font family">
      <option value="">Default</option>
      <option value="Poppins">Poppins (EN)</option>
      <option value="Roboto">Roboto (EN)</option>
      <option value="Montserrat">Montserrat (EN)</option>
      <option value="Noto Sans Telugu">Noto Sans Telugu</option>
      <option value="Ramabhadra">Ramabhadra</option>
      <option value="NTR">NTR</option>
    </select>

    <button data-style="bold"><b>B</b></button>
    <button data-style="italic"><i>I</i></button>
  `;

  toolbar.addEventListener("input", onChange);
  toolbar.addEventListener("click", onClick);
}

/* ===============================
   ATTACH BELOW BLOCK (IMPORTANT)
================================ */
function attachToolbar(blockEl) {
  if (!toolbar || !blockEl) return;

  toolbar.remove();          // remove from old place
  blockEl.after(toolbar);    // attach BELOW block
  toolbar.style.display = "flex";
}

/* ===============================
   APPLY STYLES
================================ */
function onChange(e) {
  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (e.target.type === "number")
    block.data.style.fontSize = +e.target.value;

  if (e.target.type === "color")
    block.data.style.color = e.target.value;

  if (e.target.tagName === "SELECT")
    block.data.style.fontFamily = e.target.value;
}

function onClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (btn.dataset.style === "bold")
    block.data.style.bold = !block.data.style.bold;

  if (btn.dataset.style === "italic")
    block.data.style.italic = !block.data.style.italic;
}

/* ===============================
   HELPERS
================================ */
function getSelectedBlock() {
  const state = getState();
  const id = getActiveBlock();
  return state.page?.blocks.find(
    b => b.id === id && b.type === "text"
  );
}

/* ===============================
   CLICK HANDLER
================================ */
document.addEventListener("click", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl) return;
  if (!getState().adminMode) return;

  createToolbar();
  attachToolbar(blockEl);
});

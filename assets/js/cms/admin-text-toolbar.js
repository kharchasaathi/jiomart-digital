/***************************************************
 * ADMIN TEXT TOOLBAR – FINAL (BLOCK ATTACHED)
 * ✔ Toolbar appears BELOW active TEXT block
 * ✔ NO floating / NO absolute
 * ✔ SAME behaviour as OLD BACKUP
 * ✔ LOGIC FIXED – styles APPLY LIVE
 ***************************************************/

import { getActiveBlock, getState } from "../core/state.js";

let toolbar = null;

/* ===============================
   CREATE TOOLBAR (ONCE)
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

  toolbar.style.display = "none";

  toolbar.addEventListener("input", onChange);
  toolbar.addEventListener("click", onClick);
}

/* ===============================
   ATTACH TOOLBAR BELOW BLOCK
================================ */
function attachToolbar(blockEl) {
  if (!toolbar || !blockEl) return;

  toolbar.remove();
  blockEl.after(toolbar);
  toolbar.style.display = "flex";
}

/* ===============================
   🔥 APPLY STYLES TO DOM (MISSING FIX)
================================ */
function applyStylesToElement(blockEl, style = {}) {
  if (!blockEl) return;

  const nodes = blockEl.querySelectorAll("*");
  const targets = nodes.length ? nodes : [blockEl];

  targets.forEach(el => {
    el.style.fontSize = style.fontSize
      ? style.fontSize + "px"
      : "";

    el.style.color = style.color || "";
    el.style.fontFamily = style.fontFamily || "";
    el.style.fontWeight = style.bold ? "bold" : "normal";
    el.style.fontStyle = style.italic ? "italic" : "normal";
  });
}

/* ===============================
   APPLY STYLES – INPUTS
================================ */
function onChange(e) {
  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (e.target.type === "number") {
    block.data.style.fontSize = Number(e.target.value);
  }

  if (e.target.type === "color") {
    block.data.style.color = e.target.value;
  }

  if (e.target.tagName === "SELECT") {
    block.data.style.fontFamily = e.target.value;
  }

  applyStylesToElement(getActiveBlockElement(), block.data.style);
}

/* ===============================
   APPLY STYLES – BUTTONS
================================ */
function onClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (btn.dataset.style === "bold") {
    block.data.style.bold = !block.data.style.bold;
    btn.classList.toggle("active", block.data.style.bold);
  }

  if (btn.dataset.style === "italic") {
    block.data.style.italic = !block.data.style.italic;
    btn.classList.toggle("active", block.data.style.italic);
  }

  applyStylesToElement(getActiveBlockElement(), block.data.style);
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

function getActiveBlockElement() {
  const id = getActiveBlock();
  if (!id) return null;

  return document.querySelector(
    `.cms-block-wrapper[data-block-id="${id}"] .cms-text-block`
  );
}

/* ===============================
   BLOCK CLICK LISTENER
================================ */
document.addEventListener("click", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl) return;
  if (!getState().adminMode) return;

  createToolbar();
  attachToolbar(blockEl);

  const block = getSelectedBlock();
  if (block?.data?.style) {
    applyStylesToElement(blockEl, block.data.style);
  }
});

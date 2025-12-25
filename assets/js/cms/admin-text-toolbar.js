import { getActiveBlock, getState } from "../core/state.js";

let toolbar = null;
let savedSelection = null;

/* ===============================
   SELECTION HELPERS
================================ */
function saveSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  savedSelection = sel.getRangeAt(0);
}

function restoreSelection() {
  if (!savedSelection) return;
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(savedSelection);
}

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
    <input type="color" title="Text background" data-bg />

    <select title="Font family">
      <option value="">Default</option>
      <option value="Poppins">Poppins</option>
      <option value="Roboto">Roboto</option>
      <option value="Montserrat">Montserrat</option>
    </select>

    <button data-style="bold"><b>B</b></button>
    <button data-style="italic"><i>I</i></button>
  `;

  toolbar.style.display = "none";

  // 🔥 DO NOT LOSE SELECTION
  toolbar.addEventListener("mousedown", e => e.preventDefault());

  toolbar.addEventListener("input", handleInput);
  toolbar.addEventListener("click", handleClick);
}

/* ===============================
   ATTACH TOOLBAR
================================ */
function attachToolbar(blockEl) {
  toolbar.remove();
  blockEl.after(toolbar);
  toolbar.style.display = "flex";
}

/* ===============================
   ROOT STYLE APPLY (ONLY ROOT)
================================ */
function applyBlockStyles(blockEl, style = {}) {
  if (!blockEl) return;

  if (style.fontSize) {
    blockEl.style.fontSize = style.fontSize + "px";
  }

  if (style.color) {
    blockEl.style.color = style.color;
  }

  if (style.fontFamily) {
    blockEl.style.fontFamily =
      `"${style.fontFamily}", system-ui, sans-serif`;
  }

  blockEl.style.fontWeight = style.bold ? "bold" : "normal";
  blockEl.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
   INLINE TEXT COLOR
================================ */
function applyInlineColor(color) {
  restoreSelection();

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  const span = document.createElement("span");
  span.style.color = color;

  try {
    range.surroundContents(span);
    sel.removeAllRanges();
  } catch {}
}

/* ===============================
   INLINE BACKGROUND
================================ */
function applyTextBackground(color) {
  restoreSelection();

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  const span = document.createElement("span");
  span.style.backgroundColor = color;

  // inherit everything else
  span.style.color = "inherit";
  span.style.fontSize = "inherit";
  span.style.fontFamily = "inherit";

  try {
    range.surroundContents(span);
    sel.removeAllRanges();
  } catch {}
}

/* ===============================
   INPUT HANDLER
================================ */
function handleInput(e) {
  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (e.target.type === "number") {
    block.data.style.fontSize = Number(e.target.value);
  }

  if (e.target.type === "color" && !e.target.dataset.bg) {
    block.data.style.color = e.target.value;
    applyInlineColor(e.target.value);
  }

  if (e.target.dataset.bg) {
    applyTextBackground(e.target.value);
    return;
  }

  if (e.target.tagName === "SELECT") {
    block.data.style.fontFamily = e.target.value;
  }

  applyBlockStyles(
    getActiveBlockElement(),
    block.data.style
  );
}

/* ===============================
   BUTTON HANDLER
================================ */
function handleClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (btn.dataset.style === "bold") {
    block.data.style.bold = !block.data.style.bold;
  }

  if (btn.dataset.style === "italic") {
    block.data.style.italic = !block.data.style.italic;
  }

  applyBlockStyles(
    getActiveBlockElement(),
    block.data.style
  );
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
  return document.querySelector(
    `.cms-block-wrapper[data-block-id="${id}"] .cms-text-block`
  );
}

/* ===============================
   SELECTION SAVE
================================ */
document.addEventListener("mouseup", e => {
  const el = e.target.closest(".cms-text-block.editable");
  if (el && getState().adminMode) saveSelection();
});

/* ===============================
   BLOCK CLICK
================================ */
document.addEventListener("click", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl || !getState().adminMode) return;

  createToolbar();
  attachToolbar(blockEl);

  const block = getSelectedBlock();
  if (block?.data?.style) {
    applyBlockStyles(blockEl, block.data.style);
  }
});

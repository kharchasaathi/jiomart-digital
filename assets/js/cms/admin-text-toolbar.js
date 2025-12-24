import { getActiveBlock, getState } from "../core/state.js";

let toolbar = null;
let savedSelection = null;

/* ===============================
   SELECTION HELPERS (FIXED)
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
   CREATE TOOLBAR (ONCE)
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

      <optgroup label="English Fonts">
        <option value="Poppins">Poppins</option>
        <option value="Roboto">Roboto</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Inter">Inter</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Lato">Lato</option>
        <option value="Nunito">Nunito</option>
        <option value="Raleway">Raleway</option>
        <option value="Playfair Display">Playfair Display</option>
        <option value="Merriweather">Merriweather</option>
      </optgroup>

      <optgroup label="Telugu Fonts">
        <option value="Noto Sans Telugu">Noto Sans Telugu</option>
        <option value="Ramabhadra">Ramabhadra</option>
        <option value="NTR">NTR</option>
        <option value="Gurajada">Gurajada</option>
        <option value="Suranna">Suranna</option>
        <option value="Pothana2000">Pothana2000</option>
        <option value="Timmana">Timmana</option>
        <option value="Mallanna">Mallanna</option>
        <option value="Tenali Ramakrishna">Tenali Ramakrishna</option>
        <option value="Sree Krushnadevaraya">Sree Krushnadevaraya</option>
      </optgroup>
    </select>

    <button data-style="bold"><b>B</b></button>
    <button data-style="italic"><i>I</i></button>
  `;

  toolbar.style.display = "none";

  /* 🔥 CRITICAL FIX
     Toolbar click should NOT clear selection */
  toolbar.addEventListener("mousedown", e => {
    e.preventDefault();
  });

  toolbar.addEventListener("input", onChange);
  toolbar.addEventListener("click", onClick);
}

/* ===============================
   ATTACH TOOLBAR BELOW BLOCK
================================ */
function attachToolbar(blockEl) {
  toolbar.remove();
  blockEl.after(toolbar);
  toolbar.style.display = "flex";
}

/* ===============================
   APPLY STYLES (OLD LOGIC – UNCHANGED)
================================ */
function applyStylesToElement(blockEl, style = {}) {
  if (!blockEl) return;

  applyStyle(blockEl, style);
  blockEl.querySelectorAll("*").forEach(el =>
    applyStyle(el, style)
  );
}

function applyStyle(el, style) {
  el.style.fontSize = style.fontSize
    ? style.fontSize + "px"
    : "";

  el.style.color = style.color || "";

  el.style.fontFamily = style.fontFamily
    ? `"${style.fontFamily}", system-ui, sans-serif`
    : "";

  el.style.fontWeight = style.bold ? "bold" : "normal";
  el.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
   INLINE TEXT BACKGROUND (FIXED)
================================ */
function applyTextBackground(color) {
  restoreSelection();

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  const span = document.createElement("span");
  span.style.backgroundColor = color;

  /* 🔥 KEEP TEXT VISIBLE */
  span.style.color = "inherit";
  span.style.fontFamily = "inherit";
  span.style.fontSize = "inherit";
  span.style.fontWeight = "inherit";
  span.style.fontStyle = "inherit";

  try {
    range.surroundContents(span);
    sel.removeAllRanges();
  } catch {}
}

/* ===============================
   INLINE TEXT COLOR (FIXED)
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
   INPUT HANDLER (FINAL FIX)
================================ */
function onChange(e) {
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

  applyStylesToElement(
    getActiveBlockElement(),
    block.data.style
  );
}

/* ===============================
   BUTTON HANDLER (UNCHANGED)
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

  applyStylesToElement(
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
   SAVE SELECTION FROM EDITOR
   🔥 THIS WAS MISSING
================================ */
document.addEventListener("mouseup", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl || !getState().adminMode) return;
  saveSelection();
});

/* ===============================
   BLOCK CLICK LISTENER
================================ */
document.addEventListener("click", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl || !getState().adminMode) return;

  createToolbar();
  attachToolbar(blockEl);

  const block = getSelectedBlock();
  if (block?.data?.style) {
    applyStylesToElement(blockEl, block.data.style);
  }
});

/***************************************************
 * ADMIN TEXT TOOLBAR – FINAL (100% FIXED)
 * ✔ Text color
 * ✔ Text BLOCK background color (FORCED)
 * ✔ CSS override proof
 * ✔ Cursor safe
 ***************************************************/

import { getActiveBlock, getState } from "../core/state.js";

let toolbar = null;

/* ===============================
   FORCE REPAINT
================================ */
function forceRepaint(el) {
  if (!el || !el.isContentEditable) return;

  el.contentEditable = "false";
  el.offsetHeight;
  el.contentEditable = "true";
  el.focus();
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
    <input type="color" title="Text block background" data-bg />

    <select title="Font family">
      <option value="">Default</option>
      <option value="Poppins">Poppins</option>
      <option value="Roboto">Roboto</option>
      <option value="Montserrat">Montserrat</option>
      <option value="Inter">Inter</option>
      <option value="Open Sans">Open Sans</option>
    </select>

    <button data-style="bold"><b>B</b></button>
    <button data-style="italic"><i>I</i></button>
  `;

  toolbar.style.display = "none";
  toolbar.addEventListener("input", onChange);
  toolbar.addEventListener("click", onClick);
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
   APPLY STYLES (🔥 FIX HERE)
================================ */
function applyStyles(blockEl, style = {}) {
  if (!blockEl) return;

  /* TEXT */
  blockEl.style.fontSize = style.fontSize
    ? style.fontSize + "px"
    : "";

  blockEl.style.color = style.color || "";
  blockEl.style.fontFamily = style.fontFamily || "";
  blockEl.style.fontWeight = style.bold ? "bold" : "normal";
  blockEl.style.fontStyle = style.italic ? "italic" : "normal";

  /* 🔥 TEXT BLOCK BACKGROUND (FORCED) */
  if (style.backgroundColor) {
    blockEl.style.setProperty(
      "background-color",
      style.backgroundColor,
      "important"
    );
    blockEl.style.padding = "12px";
    blockEl.style.borderRadius = "8px";
  } else {
    blockEl.style.removeProperty("background-color");
  }
}

/* ===============================
   INPUT HANDLER
================================ */
function onChange(e) {
  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (e.target.type === "number") {
    block.data.style.fontSize = +e.target.value;
  }

  if (e.target.type === "color" && !e.target.dataset.bg) {
    block.data.style.color = e.target.value;
  }

  if (e.target.dataset.bg) {
    block.data.style.backgroundColor = e.target.value;
  }

  if (e.target.tagName === "SELECT") {
    block.data.style.fontFamily = e.target.value;
  }

  const el = getActiveBlockElement();
  applyStyles(el, block.data.style);
  forceRepaint(el);
}

/* ===============================
   BUTTON HANDLER
================================ */
function onClick(e) {
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

  const el = getActiveBlockElement();
  applyStyles(el, block.data.style);
  forceRepaint(el);
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
   BLOCK CLICK
================================ */
document.addEventListener("click", e => {
  const blockEl = e.target.closest(".cms-text-block.editable");
  if (!blockEl || !getState().adminMode) return;

  createToolbar();
  attachToolbar(blockEl);

  const block = getSelectedBlock();
  if (block?.data?.style) {
    applyStyles(blockEl, block.data.style);
    forceRepaint(blockEl);
  }
});

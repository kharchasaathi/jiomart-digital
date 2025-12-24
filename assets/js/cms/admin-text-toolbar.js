/***************************************************
 * ADMIN TEXT TOOLBAR – FINAL WORKING (SELECTION BASED)
 * ✔ English + Telugu fonts
 * ✔ Size / Color / Bold / Italic
 * ✔ Toolbar follows TEXT SELECTION (NOT click)
 * ✔ Absolute position – NO overlay
 ***************************************************/

import { getActiveBlock, getState } from "../core/state.js";

let toolbar;

/* ===============================
   CREATE TOOLBAR
================================ */
function createToolbar() {
  if (toolbar) return;

  toolbar = document.createElement("div");
  toolbar.className = "admin-text-toolbar text-toolbar";

  toolbar.style.cssText = `
    position: absolute;
    z-index: 9999;
    display: none;
  `;

  toolbar.innerHTML = `
    <input type="number" min="10" max="80" title="Font size" />
    <input type="color" title="Text color" />

    <select title="Font family">
      <optgroup label="English">
        <option value="system-ui">Default</option>
        <option value="Poppins">Poppins</option>
        <option value="Roboto">Roboto</option>
        <option value="Montserrat">Montserrat</option>
      </optgroup>
      <optgroup label="Telugu">
        <option value="Noto Sans Telugu">Noto Sans Telugu</option>
        <option value="Ramabhadra">Ramabhadra</option>
        <option value="NTR">NTR</option>
      </optgroup>
    </select>

    <button data-style="bold"><b>B</b></button>
    <button data-style="italic"><i>I</i></button>
  `;

  document.body.appendChild(toolbar);

  toolbar.addEventListener("input", onChange);
  toolbar.addEventListener("click", onClick);
}

/* ===============================
   POSITION TOOLBAR ON SELECTION
================================ */
function positionFromSelection() {
  const state = getState();
  if (!state.adminMode) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    hideToolbar();
    return;
  }

  const range = selection.getRangeAt(0);
  if (range.collapsed) {
    hideToolbar();
    return;
  }

  const blockEl = range.startContainer.parentElement?.closest(
    ".cms-text-block.editable"
  );
  if (!blockEl) {
    hideToolbar();
    return;
  }

  const rect = range.getBoundingClientRect();

  toolbar.style.top =
    window.scrollY + rect.top - toolbar.offsetHeight - 10 + "px";
  toolbar.style.left =
    window.scrollX + rect.left + "px";

  toolbar.style.display = "flex";
}

/* ===============================
   HIDE TOOLBAR
================================ */
function hideToolbar() {
  if (toolbar) toolbar.style.display = "none";
}

/* ===============================
   APPLY STYLE – INPUT
================================ */
function onChange(e) {
  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (e.target.type === "number") {
    block.data.style.fontSize = +e.target.value;
  }

  if (e.target.type === "color") {
    block.data.style.color = e.target.value;
  }

  if (e.target.tagName === "SELECT") {
    block.data.style.fontFamily = e.target.value;
  }
}

/* ===============================
   APPLY STYLE – BUTTONS
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
   EVENTS
================================ */
document.addEventListener("selectionchange", positionFromSelection);

document.addEventListener("ADMIN_STATE_CHANGED", e => {
  if (e.detail?.isAdmin) {
    createToolbar();
  } else {
    toolbar?.remove();
    toolbar = null;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (getState().adminMode) createToolbar();
});

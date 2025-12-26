/***************************************************
 * ADMIN TEXT TOOLBAR – FINAL (BLOCK ATTACHED)
 * ✔ Toolbar appears BELOW active TEXT block
 * ✔ NO floating / NO absolute
 * ✔ SAME behaviour as OLD BACKUP
 * ✔ LOGIC FIXED – styles APPLY LIVE
 * ✔ 10 English + 10 Telugu fonts
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
   🔥 APPLY STYLES (ROOT + INNER)
================================ */
function applyStylesToElement(blockEl, style = {}) {
  if (!blockEl) return;

  applyStyle(blockEl, style);
  blockEl.querySelectorAll("*").forEach(el => {
    applyStyle(el, style);
  });
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

  /* 🔥 FIX #1 — FORCE FOCUS */
  const el = getActiveBlockElement();
  if (el) el.focus();

  applyStylesToElement(el, block.data.style);
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

  /* 🔥 FIX #2 — FORCE FOCUS */
  const el = getActiveBlockElement();
  if (el) el.focus();

  applyStylesToElement(el, block.data.style);
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

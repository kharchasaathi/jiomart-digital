import { getActiveBlock, getState } from "../core/state.js";

let toolbar;

/* ===============================
   CREATE TOOLBAR
================================ */
function createToolbar() {
  if (toolbar) return;

  toolbar = document.createElement("div");
  toolbar.className = "admin-text-toolbar";

  /* 🔒 fallback inline styles (CSS fail అయినా safe) */
  toolbar.style.cssText = `
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
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
   APPLY STYLE – INPUT
================================ */
function onChange(e) {
  const state = getState();
  if (!state.adminMode) return;

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

  document.dispatchEvent(new Event("cms-rerender"));
}

/* ===============================
   APPLY STYLE – BUTTONS
================================ */
function onClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const state = getState();
  if (!state.adminMode) return;

  const block = getSelectedBlock();
  if (!block) return;

  block.data.style ||= {};

  if (btn.dataset.style === "bold") {
    block.data.style.bold = !block.data.style.bold;
  }

  if (btn.dataset.style === "italic") {
    block.data.style.italic = !block.data.style.italic;
  }

  document.dispatchEvent(new Event("cms-rerender"));
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
   ADMIN STATE HANDLING
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  if (e.detail?.isAdmin) {
    createToolbar();
  } else {
    toolbar?.remove();
    toolbar = null;
  }
});

/* ===============================
   SAFE INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (getState().adminMode) createToolbar();
});

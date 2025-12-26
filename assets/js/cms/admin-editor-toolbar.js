/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL + PAGE BG (FIXED)
 * ✔ Add blocks (Text / Image / Video)
 * ✔ Save
 * ✔ Per-page background color
 * ✔ Page BG DOES NOT affect text blocks
 * ✔ Same architecture (NO regression)
 ***************************************************/

import { addBlock } from "./blocks.js";
import { getState } from "../core/state.js";

let toolbarCreated = false;

/* ===============================
   CREATE TOOLBAR
================================ */
function createToolbar() {
  if (toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.id = "cms-toolbar";
  toolbar.className = "editor-toolbar";

  /* FORCE POSITION */
  Object.assign(toolbar.style, {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "99999",
    background: "#111",
    padding: "10px",
    borderRadius: "14px",
    display: "flex",
    gap: "8px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
  });

  /* BUTTONS */
  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="page-bg">🎨 Page BG</button>
    <button data-action="save">💾 Save</button>
  `;

  /* COLOR INPUT (HIDDEN) */
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.style.display = "none";
  toolbar.appendChild(colorInput);

  /* BUTTON EVENTS */
  toolbar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "save") {
      document.dispatchEvent(new Event("cms-save"));
      return;
    }

    if (action === "page-bg") {
      colorInput.click();
      return;
    }

    addBlock(action);
  });

  /* PAGE BG CHANGE */
  colorInput.oninput = e => {
    const state = getState();
    if (!state.page) return;

    state.page.style ||= {};
    state.page.style.backgroundColor = e.target.value;

    applyPageBackground(e.target.value);
  };

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  /* APPLY SAVED PAGE BG */
  const state = getState();
  if (state.page?.style?.backgroundColor) {
    applyPageBackground(state.page.style.backgroundColor);
  }

  console.log("🧰 Admin editor toolbar ready (Page BG FIXED)");
}

/* ===============================
   ✅ APPLY PAGE BACKGROUND (REAL FIX)
   ⚠️ ONLY pageRoot, NOT body
================================ */
function applyPageBackground(color) {
  const pageRoot = document.getElementById("pageRoot");
  if (!pageRoot) return;

  pageRoot.style.backgroundColor = color;
}

/* ===============================
   REMOVE TOOLBAR
================================ */
function removeToolbar() {
  document.getElementById("cms-toolbar")?.remove();
  toolbarCreated = false;
}

/* ===============================
   ENABLE ADMIN EDITOR (FALLBACK)
================================ */
document.addEventListener("ENABLE_ADMIN_EDITOR", () => {
  const state = getState();
  if (!state.adminMode) return;

  document.body.classList.add("admin-mode");
  setTimeout(createToolbar, 50);
});

/* ===============================
   ADMIN STATE CHANGED
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin = e.detail?.adminMode ?? false;

  if (isAdmin) {
    document.body.classList.add("admin-mode");
    setTimeout(createToolbar, 50);
  } else {
    document.body.classList.remove("admin-mode");
    removeToolbar();
  }
});

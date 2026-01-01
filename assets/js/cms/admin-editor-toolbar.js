/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL (TEXT + IMAGE + VIDEO + TABS)
 * ✔ Emoji buttons (UTF-8 safe)
 * ✔ Tabs block supported
 * ✔ Page background persistence
 * ✔ Single toolbar
 * ✔ Safe admin lifecycle
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

  /* POSITION + STYLE */
  Object.assign(toolbar.style, {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "99999",
    background: "#111",
    padding: "10px 12px",
    borderRadius: "14px",
    display: "flex",
    gap: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
  });

  /* BUTTONS */
  toolbar.appendChild(createButton("➕ Text", "text"));
  toolbar.appendChild(createButton("🖼 Image", "image"));
  toolbar.appendChild(createButton("🎥 Video", "video"));
  toolbar.appendChild(createButton("📑 Tabs", "tabs"));
  toolbar.appendChild(createButton("🎨 Page BG", "page-bg"));
  toolbar.appendChild(createButton("💾 Save", "save"));

  /* COLOR INPUT (HIDDEN) */
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.style.display = "none";
  toolbar.appendChild(colorInput);

  /* CLICK HANDLER */
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

  /* PAGE BACKGROUND CHANGE */
  colorInput.oninput = e => {
    const state = getState();
    if (!state.page) return;

    state.page.style ||= {};
    state.page.style.backgroundColor = e.target.value;

    applyPageBackground(e.target.value);
  };

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  /* RESTORE SAVED PAGE BG */
  const state = getState();
  if (state.page?.style?.backgroundColor) {
    applyPageBackground(state.page.style.backgroundColor);
  }

  console.log("Admin editor toolbar ready");
}

/* ===============================
   CREATE BUTTON
================================ */
function createButton(label, action) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.action = action;
  btn.textContent = label;

  Object.assign(btn.style, {
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer"
  });

  return btn;
}

/* ===============================
   APPLY PAGE BACKGROUND
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
   ENABLE ADMIN EDITOR
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

/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL & STABLE
 *
 * ✅ Appears only after admin confirmed
 * ✅ No timing issues
 * ✅ No duplicate toolbar
 * ✅ Add Text / Image / Video works
 * ✅ Save works
 ***************************************************/

import { addBlock } from "./blocks.js";
import { getState } from "../core/state.js";

let toolbarCreated = false;

/* =================================================
   CREATE TOOLBAR
================================================= */
function createEditorToolbar() {
  const state = getState();

  // 🔒 Only admin can see toolbar
  if (!state.adminMode) {
    console.log("⛔ Toolbar blocked: adminMode = false");
    return;
  }

  // ❌ Already created
  if (toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.id = "cms-toolbar";
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="save">💾 Save</button>
  `;

  toolbar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "save") {
      document.dispatchEvent(new Event("cms-save"));
      return;
    }

    addBlock(action);
  });

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  console.log("🧰 Admin editor toolbar CREATED");
}

/* =================================================
   REMOVE TOOLBAR (ON LOGOUT)
================================================= */
function removeEditorToolbar() {
  const toolbar = document.getElementById("cms-toolbar");
  if (toolbar) {
    toolbar.remove();
    toolbarCreated = false;
    console.log("🧹 Admin editor toolbar REMOVED");
  }
}

/* =================================================
   🔥 SINGLE SOURCE OF TRUTH
   Listen ONLY to admin-session
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin = !!e.detail?.admin;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdmin);

  if (isAdmin) {
    // ⏳ slight delay to allow render/state settle
    setTimeout(createEditorToolbar, 100);
  } else {
    removeEditorToolbar();
  }
});

/* =================================================
   SAFETY NET
   (In case admin already logged in on refresh)
================================================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    const state = getState();
    if (state.adminMode) {
      createEditorToolbar();
    }
  }, 300);
});

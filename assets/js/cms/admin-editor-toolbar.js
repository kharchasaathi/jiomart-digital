/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL STABLE
 *
 * ✅ Appears AFTER admin confirmed
 * ✅ No timing issues
 * ✅ No duplicate toolbar
 ***************************************************/

import { addBlock } from "./blocks.js";
import { getState } from "../core/state.js";

let toolbarCreated = false;

/* =================================================
   CREATE TOOLBAR
================================================= */
function createEditorToolbar() {
  const state = getState();

  if (!state.adminMode) return;
  if (toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";
  toolbar.id = "cms-toolbar";

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
    } else {
      addBlock(action);
    }
  });

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  console.log("🧰 Admin editor toolbar CREATED");
}

/* =================================================
   REMOVE TOOLBAR (LOGOUT)
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
   LISTEN ADMIN STATE (🔥 ONLY SOURCE OF TRUTH)
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin = !!e.detail?.admin;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdmin);

  if (isAdmin) {
    setTimeout(createEditorToolbar, 50);
  } else {
    removeEditorToolbar();
  }
});

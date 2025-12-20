/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL STABLE
 *
 * ✅ Toolbar creates ONLY after admin confirmed
 * ✅ No race condition
 * ✅ Add Text / Image / Video always works
 * ✅ Save works
 * ❌ No duplicate toolbar
 ***************************************************/

import { isAdmin } from "../core/state.js";
import { addBlock } from "./blocks.js";

let toolbarCreated = false;

/* =================================================
   CREATE TOOLBAR (SAFE)
================================================= */
function createEditorToolbar() {
  if (!isAdmin()) {
    console.log("⛔ Toolbar skipped: not admin");
    return;
  }

  if (toolbarCreated) {
    console.log("ℹ️ Toolbar already created");
    return;
  }

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="save">💾 Save</button>
  `;

  toolbar.addEventListener("click", (e) => {
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

  console.log("🧰 Admin editor toolbar READY");
}

/* =================================================
   🔥 ONLY ONE ENTRY POINT
   Called AFTER admin state is FINAL
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", (e) => {
  const isAdminNow = !!e.detail?.admin;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdminNow);

  if (isAdminNow) {
    createEditorToolbar();
  }
});

/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL FIXED
 * Phase 3.3 (STABLE)
 *
 * ✅ Add Text / Image / Video works
 * ✅ Save works
 * ✅ Appears only after admin login
 * ✅ Night-mode readable
 * ❌ No state change
 * ❌ No security change
 ***************************************************/

import { isAdmin } from "../core/state.js";
import { addBlock } from "./blocks.js";

let toolbarCreated = false;

function createEditorToolbar() {
  if (!isAdmin()) return;
  if (toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="save">💾 Save</button>
  `;

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  /* ===============================
     BUTTON HANDLERS
  ================================ */

  toolbar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;

    switch (action) {
      case "text":
        addBlock("text");
        break;

      case "image":
        addBlock("image");
        break;

      case "video":
        addBlock("video");
        break;

      case "save":
        document.dispatchEvent(new Event("cms-save"));
        break;
    }
  });

  console.log("🧰 Admin editor toolbar READY");
}

/* =================================================
   INIT LOGIC (🔥 IMPORTANT FIX)
   Wait until admin session is ready
================================================= */

/* Case 1: Admin already logged in */
setTimeout(createEditorToolbar, 500);

/* Case 2: Admin logs in later */
document.addEventListener("ADMIN_STATE_CHANGED", () => {
  setTimeout(createEditorToolbar, 100);
});

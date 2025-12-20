/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL GUARANTEED FIX
 ***************************************************/

import { addBlock } from "./blocks.js";

let toolbarCreated = false;

/* =================================================
   CREATE TOOLBAR
================================================= */
function createEditorToolbar() {
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
    } else {
      addBlock(action);
    }
  });

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  console.log("🧰 Admin editor toolbar CREATED");
}

/* =================================================
   REMOVE TOOLBAR
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
   🔥 ONLY TRUST THIS EVENT
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin = !!e.detail?.admin;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdmin);

  if (isAdmin) {
    setTimeout(createEditorToolbar, 100);
  } else {
    removeEditorToolbar();
  }
});

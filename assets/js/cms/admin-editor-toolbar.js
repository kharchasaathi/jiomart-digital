/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL GUARANTEED
 ***************************************************/
import { addBlock } from "./blocks.js";

let toolbarCreated = false;

function createToolbar() {
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

  console.log("🧰 Toolbar CREATED");
}

function removeToolbar() {
  document.getElementById("cms-toolbar")?.remove();
  toolbarCreated = false;
  console.log("🧹 Toolbar REMOVED");
}

document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin = !!e.detail?.isAdmin;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdmin);

  if (isAdmin) {
    setTimeout(createToolbar, 100);
  } else {
    removeToolbar();
  }
});

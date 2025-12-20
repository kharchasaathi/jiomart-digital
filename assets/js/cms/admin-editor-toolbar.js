import { isAdmin } from "../core/state.js";
import { addBlock } from "./blocks.js";

let toolbarCreated = false;

function createEditorToolbar() {
  if (!isAdmin() || toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="save">💾 Save</button>
  `;

  toolbar.addEventListener("click", e => {
    const action = e.target.dataset.action;
    if (!action) return;

    if (action === "save") {
      document.dispatchEvent(new Event("cms-save"));
    } else {
      addBlock(action);
    }
  });

  document.body.appendChild(toolbar);
  toolbarCreated = true;
  console.log("🧰 Admin editor toolbar READY");
}

/* 🔥 correct event */
document.addEventListener("ADMIN_STATE_CHANGED", () => {
  setTimeout(createEditorToolbar, 100);
});

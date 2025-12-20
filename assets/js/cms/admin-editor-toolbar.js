/***************************************************
 * ADMIN EDITOR TOOLBAR – PHASE 3.3
 * Floating toolbar for admin only
 * SAFE • NO STATE CHANGE • NO SECURITY CHANGE
 ***************************************************/

import { isAdmin } from "../core/state.js";
import { addBlock } from "./blocks.js";

function createEditorToolbar() {
  if (!isAdmin()) return;
  if (document.querySelector(".editor-toolbar")) return;

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button id="addText">➕ Text</button>
    <button id="addImage">🖼 Image</button>
    <button id="addVideo">🎥 Video</button>
    <button id="savePage">💾 Save</button>
  `;

  document.body.appendChild(toolbar);

  /* ===============================
     BUTTON ACTIONS
  ================================ */

  toolbar.querySelector("#addText").addEventListener("click", () => {
    addBlock("text");
  });

  toolbar.querySelector("#addImage").addEventListener("click", () => {
    addBlock("image");
  });

  toolbar.querySelector("#addVideo").addEventListener("click", () => {
    addBlock("video");
  });

  toolbar.querySelector("#savePage").addEventListener("click", () => {
    document.dispatchEvent(new Event("cms-save"));
  });

  console.log("🧰 Admin editor toolbar ready");
}

/* Init after page + admin ready */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(createEditorToolbar, 300);
});

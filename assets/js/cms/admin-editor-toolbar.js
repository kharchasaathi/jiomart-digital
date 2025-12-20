/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL
 * Floating bottom toolbar (admin only)
 ***************************************************/

import { isAdmin } from "../core/state.js";
import { addBlock } from "./blocks.js";

function initToolbar() {
  if (!isAdmin()) return;
  if (document.querySelector(".editor-toolbar")) return;

  const bar = document.createElement("div");
  bar.className = "editor-toolbar";

  bar.innerHTML = `
    <button data-type="text">+ Text</button>
    <button data-type="image">+ Image</button>
    <button data-type="video">+ Video</button>
    <button id="savePage">💾 Save</button>
  `;

  bar.onclick = e => {
    const type = e.target.dataset.type;
    if (type) addBlock(type);
    if (e.target.id === "savePage")
      document.dispatchEvent(new Event("cms-save"));
  };

  document.body.appendChild(bar);
}

/* Init after admin ready */
document.addEventListener("ADMIN_STATE_CHANGED", initToolbar);

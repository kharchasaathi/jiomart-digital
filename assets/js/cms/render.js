/***************************************************
 * CMS RENDER – SINGLE RENDER FUNCTION (FINAL)
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js"; // ✅ FIXED PATH
import { initEditorToolbar } from "./editor-toolbar.js"; // ✅ ADD THIS

export function renderPage() {
  console.log("🧩 renderPage() called");

  const root = document.getElementById("pageRoot");
  if (!root) {
    console.warn("❌ #pageRoot not found");
    return;
  }

  const state = getState();
  console.log("📦 State in render:", state);

  if (!state.page || !Array.isArray(state.page.blocks)) {
    console.warn("⚠️ No page data");
    return;
  }

  // 🔄 Clear before render
  root.innerHTML = "";

  // 🧱 Render CMS blocks
  renderBlocks(root);

  // ✏️ ADMIN TOOLBAR INIT (AFTER BLOCKS EXIST)
  if (state.adminMode === true) {
    initEditorToolbar();
    console.log("🛠️ Admin editor toolbar initialized");
  }
}

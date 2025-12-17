/***************************************************
 * CMS RENDER – SINGLE RENDER FUNCTION (SAFE FINAL)
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js";
import { initEditorToolbar } from "./editor-toolbar.js";

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

  // ✏️ ADMIN TOOLBAR INIT (ONLY ONCE)
  if (state.adminMode === true) {
    if (!document.getElementById("cms-toolbar")) {
      initEditorToolbar();
      console.log("🛠️ Admin editor toolbar initialized");
    }
  }
}

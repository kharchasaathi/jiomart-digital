/***************************************************
 * CMS RENDER – SINGLE RENDER FUNCTION (FINAL)
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

  /* ===============================
     RESET ROOT
  ================================ */
  root.innerHTML = "";

  /* ===============================
     PAGE BLOCKS
  ================================ */
  if (state.page && Array.isArray(state.page.blocks)) {
    renderBlocks(root);
    console.log("🧱 Blocks rendered");
  } else {
    console.warn("⚠️ Page data not ready yet");
  }

  /* ===============================
     ADMIN TOOLBAR
  ================================ */
  const toolbar = document.getElementById("cms-toolbar");

  if (state.adminMode === true) {
    if (!toolbar) {
      initEditorToolbar();
      console.log("🛠️ Admin editor toolbar initialized");
    }
  } else {
    // 🔥 CLEANUP ON LOGOUT
    if (toolbar) {
      toolbar.remove();
      console.log("🧹 Admin toolbar removed");
    }
  }
}

/***************************************************
 * CMS RENDER – CONTENT ONLY (Phase 4.1)
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js";
import "./admin-text-toolbar.js"; // 🔥 LOAD TEXT STYLE TOOLBAR

export function renderPage() {
  console.log("🧩 renderPage() called");

  const root = document.getElementById("pageRoot");
  if (!root) {
    console.warn("❌ #pageRoot not found");
    return;
  }

  const state = getState();

  if (!state.page) {
    console.warn("⚠️ Page not ready");
    return;
  }

  /* ===============================
     RESET PAGE
  ================================ */
  root.innerHTML = "";

  /* ===============================
     RENDER BLOCKS
  ================================ */
  renderBlocks(root);

  console.log("🧱 Blocks rendered");
}

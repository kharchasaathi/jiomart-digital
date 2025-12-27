/***************************************************
 * CMS RENDER – CONTENT ONLY (Phase 4.2 FINAL FIX)
 * ✔ Blocks render
 * ✔ Page background restored on every render
 * ✔ No reset on Home click
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js";
import "./admin-text-toolbar.js"; // 🔥 TEXT STYLE TOOLBAR

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
     🔥 APPLY PAGE BACKGROUND (CRITICAL)
  ================================ */
  if (state.page.style?.backgroundColor) {
    root.style.backgroundColor = state.page.style.backgroundColor;
  } else {
    root.style.backgroundColor = "";
  }

  /* ===============================
     RENDER BLOCKS
  ================================ */
  root.innerHTML = "";
  renderBlocks(root);

  console.log("🧱 Blocks rendered with page background");
}

/* =================================================
   🔁 RE-RENDER ON BLOCK / STYLE CHANGE
================================================= */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender received");
  renderPage();
});

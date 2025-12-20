/***************************************************
 * CMS RENDER – SINGLE SOURCE OF TRUTH (FINAL)
 *
 * ✅ Render ONLY when state is ready
 * ✅ No duplicate render
 * ✅ No toolbar init here (toolbar listens itself)
 * ✅ Safe on refresh / hard reload
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js";

let renderedOnce = false;

/* =================================================
   MAIN RENDER FUNCTION
================================================= */
export function renderPage() {
  const root = document.getElementById("pageRoot");

  if (!root) {
    console.warn("❌ renderPage: #pageRoot not found");
    return;
  }

  const state = getState();

  console.log("🧩 renderPage() called");
  console.log("📦 State in render:", {
    adminMode: state.adminMode,
    pageReady: !!state.page,
    blocks: state.page?.blocks?.length
  });

  /* =================================================
     SAFETY: do not render without page data
  ================================================= */
  if (!state.page || !Array.isArray(state.page.blocks)) {
    console.warn("⏳ Page data not ready, render skipped");
    return;
  }

  /* =================================================
     RESET ROOT (SAFE)
  ================================================= */
  root.innerHTML = "";

  /* =================================================
     RENDER BLOCKS
  ================================================= */
  renderBlocks(root);
  renderedOnce = true;

  console.log("🧱 Blocks rendered successfully");

  /* =================================================
     NO TOOLBAR LOGIC HERE ❌
     Toolbar listens to ADMIN_STATE_CHANGED itself
  ================================================= */
}

/* =================================================
   OPTIONAL: re-render on cms-rerender
================================================= */
document.addEventListener("cms-rerender", () => {
  console.log("🔄 cms-rerender received");

  // Allow re-render only if already rendered once
  if (!renderedOnce) return;

  renderPage();
});

/***************************************************
 * CMS RENDER – SINGLE RENDER FUNCTION
 ***************************************************/
import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js"; // ✅ FIXED PATH

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

  // clear only first render
  root.innerHTML = "";

  renderBlocks(root);
}

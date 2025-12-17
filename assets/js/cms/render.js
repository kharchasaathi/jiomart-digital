/***************************************************
 * CMS RENDER – DEBUG SAFE
 ***************************************************/
import { renderBlocks } from "./blocks.js";
import { getState } from "./state.js";

export function renderPage() {
  console.log("🧩 renderPage() called");

  const root = document.getElementById("pageRoot");
  if (!root) {
    console.error("❌ #pageRoot not found");
    return;
  }

  const state = getState();
  console.log("📦 State in render:", state);

  if (!state?.page?.blocks?.length) {
    console.warn("⚠️ No blocks to render");
    root.innerHTML = "";
    return;
  }

  renderBlocks(root);
  console.log("✅ Blocks rendered");
}

/***************************************************
 * CMS RENDER – SAFE (ADMIN + PUBLIC)
 ***************************************************/
import { renderBlocks } from "./blocks.js";
import { getState } from "./state.js";

export function renderPage() {
  const root = document.getElementById("pageRoot");
  if (!root) {
    console.warn("❌ #pageRoot not found");
    return;
  }

  const state = getState();

  if (!state || !state.page) {
    console.warn("⚠️ No page in state, rendering empty");
    root.innerHTML = "";
    return;
  }

  renderBlocks(root);
}

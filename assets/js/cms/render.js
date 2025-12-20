/***************************************************
 * CMS RENDER – CONTENT ONLY
 ***************************************************/
import { renderBlocks } from "./blocks.js";
import { getState } from "../core/state.js";

export function renderPage() {
  console.log("🧩 renderPage() called");

  const root = document.getElementById("pageRoot");
  if (!root) return;

  const state = getState();

  if (!state.page) {
    console.warn("⚠️ Page not ready");
    return;
  }

  root.innerHTML = "";
  renderBlocks(root);

  console.log("🧱 Blocks rendered");
}

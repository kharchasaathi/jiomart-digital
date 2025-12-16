/***************************************************
 * CMS RENDER – SAFE (ADMIN + PUBLIC)
 ***************************************************/
import { renderBlocks } from "./blocks.js";
import { getState } from "./state.js";

/* ---------------------------------
   Render page safely
---------------------------------- */
export function renderPage() {
  const root = document.getElementById("pageRoot");

  // ❌ Root missing = fatal layout issue
  if (!root) {
    console.error("❌ CMS Render failed: #pageRoot not found");
    return;
  }

  const state = getState();

  // ⏳ State not ready yet
  if (!state) {
    console.warn("⏳ CMS Render skipped: state not ready");
    root.innerHTML = "";
    return;
  }

  // 📄 Page missing
  if (!state.page) {
    console.warn("⚠️ CMS Render: no page in state");
    root.innerHTML = "";
    return;
  }

  // 🧱 Blocks missing or invalid
  if (!Array.isArray(state.page.blocks)) {
    console.warn("⚠️ CMS Render: invalid blocks, resetting");
    state.page.blocks = [];
  }

  // ✅ Render
  try {
    renderBlocks(root);
  } catch (err) {
    console.error("🔥 CMS Render crashed:", err);
    root.innerHTML = "<p style='color:red'>Render error</p>";
  }
}

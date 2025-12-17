/***************************************************
 * PUBLIC ENTRY – SINGLE RENDER SOURCE (ADMIN SAFE)
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

console.log("🚀 Public entry loaded");

(async function initPublic() {
  try {
    console.log("📥 Loading page: home");

    // Load page data from Firestore
    await loadPage("home");

    console.log("🎨 Rendering page");

    // Render page (adminMode depends on state, NOT forced here)
    renderPage();

    console.log("✅ Public page ready");
  } catch (err) {
    console.error("❌ Public init failed:", err);
  }
})();

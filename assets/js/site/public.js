import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../core/state.js";

console.log("🚀 Public entry loaded");

// Restore admin mode once
setAdminMode(localStorage.getItem("ADMIN_MODE") === "true");

(async function initPublic() {
  console.log("📥 Loading page: home");
  await loadPage("home");

  console.log("🎨 Rendering page");
  renderPage();

  console.log("👁️ Page ready");
})();

/***************************************************
 * PUBLIC ENTRY – FIXED PATHS
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../core/state.js";

console.log("🚀 Public entry loaded");

// Force public mode
setAdminMode(false);

(async function initPublic() {
  console.log("📥 Loading page: home");
  await loadPage("home");

  console.log("🎨 Rendering page");
  renderPage();
})();

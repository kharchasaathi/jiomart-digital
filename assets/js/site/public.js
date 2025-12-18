/***************************************************
 * PUBLIC ENTRY – FINAL SAFE (FIXED)
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../core/state.js";

console.log("🚀 Public entry loaded");

// 🔐 Restore admin mode from localStorage (SINGLE SOURCE)
const isAdminSession = localStorage.getItem("ADMIN_MODE") === "true";
setAdminMode(isAdminSession);

(async function initPublic() {
  console.log("📥 Loading page: home");
  await loadPage("home");

  console.log("🎨 Rendering page");
  renderPage();

  console.log(
    isAdminSession
      ? "🛠️ Admin editor ready"
      : "👁️ Public page ready"
  );
})();

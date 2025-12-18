/***************************************************
 * PUBLIC ENTRY – FINAL SAFE (ADMIN SYNC ENABLED)
 ***************************************************/

import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../core/state.js";

console.log("🚀 Public entry loaded");

/* =====================================
   RESTORE ADMIN MODE (ON PAGE LOAD)
===================================== */
const isAdminSession = localStorage.getItem("ADMIN_MODE") === "true";
setAdminMode(isAdminSession);

/* =====================================
   ADMIN STATE CHANGE LISTENER 🔥
   → Fired from admin-session.js
   → Re-renders page safely
===================================== */
window.addEventListener("ADMIN_STATE_CHANGED", () => {
  console.log("🔄 Admin state changed → re-rendering page");

  // Sync state again (single source of truth)
  const isAdmin = localStorage.getItem("ADMIN_MODE") === "true";
  setAdminMode(isAdmin);

  // Re-render page in correct mode
  renderPage();
});

/* =====================================
   INITIAL PAGE LOAD
===================================== */
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

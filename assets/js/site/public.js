import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../core/state.js";

console.log("🚀 Public entry loaded");

/* =================================================
   INITIAL PUBLIC BOOT
   (DO NOT trust auth state here)
================================================= */
(async function initPublic() {
  console.log("📥 Loading page: home");
  await loadPage("home");

  console.log("⏳ Waiting for admin state...");
})();

/* =================================================
   🔥 SINGLE RENDER TRIGGER
   Admin / Public state confirmed here
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", (e) => {
  const isAdmin = !!e.detail?.admin;

  console.log("🔔 ADMIN_STATE_CHANGED received:", isAdmin);

  // Sync state (extra safety)
  setAdminMode(isAdmin);

  console.log("🎨 Rendering page (final)");
  renderPage();

  console.log(
    isAdmin
      ? "🛠️ Admin page ready"
      : "👁️ Public page ready"
  );
});

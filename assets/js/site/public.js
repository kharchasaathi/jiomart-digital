/***************************************************
 * PUBLIC ENTRY – FINAL & STABLE (FIXED)
 * ✔ Load page data
 * ✔ Wait for admin state
 * ✔ Render exactly once
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

console.log("🚀 Public entry loaded");

let pageLoaded = false;
let adminStateReady = false;

/* =================================================
   LOAD PAGE DATA FIRST
================================================= */
(async function initPublic() {
  console.log("📥 Loading page: home");

  await loadPage("home");
  pageLoaded = true;

  console.log("📦 Page data loaded");
  tryRender();
})();

/* =================================================
   WAIT FOR ADMIN STATE (FROM admin-session.js)
   🔥 EVENT NAME FIXED
================================================= */
document.addEventListener("ADMIN_STATE_CHANGED", (e) => {
  console.log("🔔 ADMIN_STATE_CHANGED received:", e.detail);

  adminStateReady = true;
  tryRender();
});

/* =================================================
   SINGLE SAFE RENDER
================================================= */
function tryRender() {
  if (!pageLoaded || !adminStateReady) {
    console.log("⏳ Waiting to render...", {
      pageLoaded,
      adminStateReady
    });
    return;
  }

  console.log("🎨 Rendering page (final)");
  renderPage();

  console.log("✅ Page ready");
}

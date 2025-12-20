/***************************************************
 * PUBLIC ENTRY – FINAL & STABLE
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

console.log("🚀 Public entry loaded");

let pageLoaded = false;
let adminKnown = false;

/* ===============================
   LOAD PAGE FIRST
================================ */
(async function initPublic() {
  console.log("📥 Loading page: home");
  await loadPage("home");
  pageLoaded = true;
  tryRender();
})();

/* ===============================
   WAIT FOR ADMIN STATE
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", () => {
  adminKnown = true;
  tryRender();
});

/* ===============================
   SINGLE SAFE RENDER
================================ */
function tryRender() {
  if (!pageLoaded || !adminKnown) {
    console.log("⏳ Waiting...", { pageLoaded, adminKnown });
    return;
  }

  console.log("🎨 Rendering page");
  renderPage();
}

/* ===============================
   🔥 CMS RE-RENDER FIX (ONLY THIS)
================================ */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender received");
  renderPage();
});

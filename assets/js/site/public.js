/***************************************************
 * PUBLIC ENTRY – FINAL & ERROR FREE
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

console.log("🚀 Public entry loaded");

let pageLoaded = false;

/* ===============================
   LOAD PAGE FIRST (PUBLIC)
================================ */
(async function initPublic() {
  console.log("📥 Loading page: home");

  try {
    await loadPage("home");
    pageLoaded = true;
    renderSafe();
  } catch (err) {
    console.error("❌ Failed to load page:", err);
  }
})();

/* ===============================
   SAFE RENDER (NO ADMIN DEPENDENCY)
================================ */
function renderSafe() {
  if (!pageLoaded) {
    console.log("⏳ Waiting for page load...");
    return;
  }

  console.log("🎨 Rendering page");
  renderPage();
}

/* ===============================
   🔥 CMS RE-RENDER (ADMIN EDIT)
================================ */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender received");
  renderPage();
});

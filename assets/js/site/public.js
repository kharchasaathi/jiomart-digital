import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

let pageLoaded = false;
let adminKnown = false;

(async function init() {
  await loadPage("home");
  pageLoaded = true;
  tryRender();
})();

document.addEventListener("ADMIN_STATE_CHANGED", () => {
  adminKnown = true;
  tryRender();
});

function tryRender() {
  if (!pageLoaded || !adminKnown) {
    console.log("⏳ Waiting...", { pageLoaded, adminKnown });
    return;
  }

  console.log("🎨 Rendering page");
  renderPage();
}
import { renderPage } from "../cms/render.js";

/* ===============================
   CMS RERENDER LISTENER (🔥 FIX)
================================ */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender received → re-rendering");
  renderPage();
});

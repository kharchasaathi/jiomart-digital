import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

console.log("🚀 Public entry loaded");

let pageLoaded = false;
let adminKnown = false;

/* Load page first */
(async function init() {
  console.log("📥 Loading page: home");
  await loadPage("home");
  pageLoaded = true;
  tryRender();
})();

/* Wait for admin state */
document.addEventListener("ADMIN_STATE_CHANGED", () => {
  adminKnown = true;
  tryRender();
});

function tryRender() {
  if (!pageLoaded || !adminKnown) {
    console.log("⏳ Waiting to render...", { pageLoaded, adminKnown });
    return;
  }

  console.log("🎨 Rendering page");
  renderPage();
}

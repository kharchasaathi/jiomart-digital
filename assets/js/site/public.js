/***************************************************
 * PUBLIC ENTRY – SINGLE, CLEAN, STABLE
 * This is the ONLY entry for public site
 ***************************************************/

/* CMS */
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

/* CORE STATE */
import { setAdminMode } from "../core/state.js";

/* SITE UI (Header, Footer, Layout) */
import { initSiteUI } from "./site-ui.js";

console.log("🚀 Public entry loaded");

/* -------------------------------------------------
 * FORCE PUBLIC MODE
 * ------------------------------------------------- */
setAdminMode(false);

/* -------------------------------------------------
 * INIT STATIC SITE UI
 * (Header / Footer / Containers)
 * ------------------------------------------------- */
initSiteUI();

/* -------------------------------------------------
 * LOAD + RENDER PAGE
 * ------------------------------------------------- */
(async function initPublic() {
  try {
    console.log("📥 Loading page: home");
    await loadPage("home");

    console.log("🎨 Rendering page");
    renderPage();

    console.log("✅ Public page ready");
  } catch (err) {
    console.error("❌ Public init failed", err);
  }
})();

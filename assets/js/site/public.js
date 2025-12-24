/***************************************************
 * PUBLIC ENTRY – FINAL (STABLE + ADMIN SAFE)
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { getState } from "../core/state.js";

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

    // 🔥 CHECK ADMIN MODE AFTER LOAD
    const { adminMode } = getState();
    console.log("🔐 Public adminMode:", adminMode);

    if (adminMode) {
      enableAdminUI();
    }

  } catch (err) {
    console.error("❌ Failed to load page:", err);
  }
})();

/* ===============================
   SAFE RENDER
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
   ENABLE ADMIN UI (🔥 KEY FIX)
================================ */
function enableAdminUI() {
  console.log("✏️ Enabling admin UI on public page");

  // visual admin mode
  document.body.classList.add("admin-mode");

  // enable editor logic
  document.dispatchEvent(new Event("ENABLE_ADMIN_EDITOR"));

  // force toolbar creation
  document.dispatchEvent(
    new CustomEvent("ADMIN_STATE_CHANGED", {
      detail: { adminMode: true }
    })
  );
}

/* ===============================
   CMS RE-RENDER (ADMIN EDIT)
================================ */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender received");
  renderPage();
});

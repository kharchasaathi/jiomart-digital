/***************************************************
 * PUBLIC ENTRY – FINAL (STABLE + EVENT SAFE)
 ***************************************************/
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { getState } from "../core/state.js";

console.log("🚀 Public entry loaded");

let pageLoaded = false;
let adminUIEnabled = false;

/* ===============================
   LOAD PAGE FIRST
================================ */
(async function initPublic() {
  console.log("📥 Loading page: home");

  try {
    await loadPage("home");
    pageLoaded = true;
    renderSafe();

    // 🔥 FALLBACK CHECK (VERY IMPORTANT)
    const { adminMode } = getState();
    console.log("🔐 Public adminMode (fallback):", adminMode);

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
  if (!pageLoaded) return;

  console.log("🎨 Rendering page");
  renderPage();
}

/* ===============================
   ENABLE ADMIN UI (ONE TIME)
================================ */
function enableAdminUI() {
  if (adminUIEnabled) return;
  adminUIEnabled = true;

  console.log("✏️ Enabling admin UI on public page");

  // visual admin mode
  document.body.classList.add("admin-mode");

  // enable editor logic
  document.dispatchEvent(
    new Event("ENABLE_ADMIN_EDITOR")
  );

  // re-render so blocks become editable
  renderPage();
}

/* ===============================
   🔥 ADMIN STATE LISTENER
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin =
    !!(e.detail?.adminMode ?? e.detail?.isAdmin);

  console.log("🔥 PUBLIC RECEIVED ADMIN_STATE_CHANGED:", isAdmin);

  if (isAdmin) {
    enableAdminUI();
  }
});

/* ===============================
   CMS RE-RENDER
================================ */
document.addEventListener("cms-rerender", () => {
  console.log("🔁 cms-rerender");
  renderPage();
});

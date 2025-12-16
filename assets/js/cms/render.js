/***************************************************
 * CMS RENDER – CLEAN SEPARATION
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "./state.js";

export function renderPage() {
  const root = document.getElementById("pageRoot");
  if (!root) return;

  const { page, adminMode } = getState();
  if (!page) return;

  // 🔥 Always reset root (VERY IMPORTANT)
  root.innerHTML = "";
  root.style.background = "transparent";
  root.style.minHeight = "auto";

  if (adminMode) {
    renderAdminPage(root);
  } else {
    renderPublicPage(root);
  }
}

/* ===============================
   PUBLIC RENDER (SAFE)
================================ */
function renderPublicPage(root) {
  root.className = "page-root public-root";

  // no editor wrappers
  renderBlocks(root, {
    editable: false,
    showControls: false
  });
}

/* ===============================
   ADMIN RENDER (ISOLATED)
================================ */
function renderAdminPage(root) {
  root.className = "page-root admin-root";

  const adminWrapper = document.createElement("div");
  adminWrapper.className = "admin-wrapper";

  // ⚠️ NEVER dark background
  adminWrapper.style.background = "transparent";
  adminWrapper.style.position = "relative";

  renderBlocks(adminWrapper, {
    editable: true,
    showControls: true
  });

  root.appendChild(adminWrapper);
}

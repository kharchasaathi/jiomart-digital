/***************************************************
 * ADMIN EDITOR TOOLBAR – FINAL (STABLE + SAFE)
 ***************************************************/
import { addBlock } from "./blocks.js";
import { getState } from "../core/state.js";

let toolbarCreated = false;

/* ===============================
   CREATE TOOLBAR
================================ */
function createToolbar() {
  if (toolbarCreated) return;

  const toolbar = document.createElement("div");
  toolbar.id = "cms-toolbar";
  toolbar.className = "editor-toolbar";

  // 🔥 FORCE VISIBLE POSITION
  Object.assign(toolbar.style, {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "99999",
    background: "#111",
    padding: "10px",
    borderRadius: "14px",
    display: "flex",
    gap: "8px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
  });

  toolbar.innerHTML = `
    <button data-action="text">➕ Text</button>
    <button data-action="image">🖼 Image</button>
    <button data-action="video">🎥 Video</button>
    <button data-action="save">💾 Save</button>
  `;

  toolbar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === "save") {
      document.dispatchEvent(new Event("cms-save"));
    } else {
      addBlock(action);
    }
  });

  document.body.appendChild(toolbar);
  toolbarCreated = true;

  console.log("🧰 Toolbar CREATED & VISIBLE");
}

/* ===============================
   REMOVE TOOLBAR
================================ */
function removeToolbar() {
  document.getElementById("cms-toolbar")?.remove();
  toolbarCreated = false;
  console.log("🧹 Toolbar REMOVED");
}

/* ===============================
   ENABLE ADMIN EDITOR (🔥 IMPORTANT)
================================ */
document.addEventListener("ENABLE_ADMIN_EDITOR", () => {
  const state = getState();

  if (!state.adminMode) return;

  console.log("✏️ Admin editor enabled (event)");

  document.body.classList.add("admin-mode");

  // slight delay to avoid race condition
  setTimeout(createToolbar, 50);
});

/* ===============================
   ADMIN STATE CHANGED (GLOBAL)
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const isAdmin =
    e.detail?.adminMode ?? false;

  console.log("🔔 ADMIN_STATE_CHANGED (toolbar):", isAdmin);

  if (isAdmin) {
    document.body.classList.add("admin-mode");
    setTimeout(createToolbar, 50);
  } else {
    document.body.classList.remove("admin-mode");
    removeToolbar();
  }
});

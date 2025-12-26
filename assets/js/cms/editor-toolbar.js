/***************************************************
 * EDITOR TOOLBAR – CLEANED + PAGE BG BUTTON (STEP-2)
 * ✔ Text toolbar handled elsewhere
 * ✔ Page background color (per-page)
 ***************************************************/

import { getState } from "../core/state.js";

let toolbar = null;

/* ===============================
   ADMIN STATE LISTENER
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const admin =
    !!(e.detail?.adminMode ?? e.detail?.isAdmin);

  console.log(
    "🔕 Text toolbar disabled (editor-toolbar.js). Admin:",
    admin
  );

  if (!admin && toolbar) {
    toolbar.remove();
    toolbar = null;
  }

  if (admin) {
    initEditorToolbar();
  }
});

/* ===============================
   INIT EDITOR TOOLBAR
================================ */
function initEditorToolbar() {
  if (toolbar) return;

  toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";
  toolbar.style.display = "flex";
  toolbar.style.gap = "8px";

  /* 🎨 PAGE BG BUTTON */
  const pageBgBtn = document.createElement("button");
  pageBgBtn.textContent = "🎨 Page BG";

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.style.display = "none";

  pageBgBtn.onclick = () => {
    colorInput.click();
  };

  colorInput.oninput = e => {
    const state = getState();
    if (!state.page) return;

    state.page.style ||= {};
    state.page.style.backgroundColor = e.target.value;

    applyPageBackground(e.target.value);
  };

  toolbar.appendChild(pageBgBtn);
  toolbar.appendChild(colorInput);

  document.body.appendChild(toolbar);

  /* LOAD SAVED VALUE */
  const state = getState();
  if (state.page?.style?.backgroundColor) {
    applyPageBackground(state.page.style.backgroundColor);
  }
}

/* ===============================
   APPLY PAGE BACKGROUND
================================ */
function applyPageBackground(color) {
  const pageRoot =
    document.getElementById("pageRoot") || document.body;

  pageRoot.style.backgroundColor = color;
}

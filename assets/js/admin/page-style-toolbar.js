/***************************************************
 * PAGE STYLE TOOLBAR – STEP 1 (FINAL & SAFE)
 * ✔ Admin only
 * ✔ Page background color (saved)
 * ✔ Text block background color (saved)
 ***************************************************/

import { getState } from "../core/state.js";

let toolbar = null;

export function initPageStyleToolbar() {
  const state = getState();
  if (!state.adminMode) return;

  if (toolbar) return;

  toolbar = document.createElement("div");
  toolbar.className = "page-style-toolbar";

  toolbar.innerHTML = `
    <div class="page-style-title">Page Styles</div>

    <label>
      Page Background
      <input type="color" id="pageBgColor" />
    </label>

    <label style="display:block;margin-top:6px">
      Text Block Background
      <input type="color" id="textBgColor" />
    </label>
  `;

  document.body.appendChild(toolbar);

  const pageBgInput = toolbar.querySelector("#pageBgColor");
  const textBgInput = toolbar.querySelector("#textBgColor");

  /* ENSURE STYLE OBJECT */
  state.page.style ||= {};

  /* ===============================
     LOAD SAVED VALUES
  ================================ */
  if (state.page.style.backgroundColor) {
    pageBgInput.value = state.page.style.backgroundColor;
    document.body.style.backgroundColor =
      state.page.style.backgroundColor;
  }

  if (state.page.style.textBlockBackground) {
    textBgInput.value = state.page.style.textBlockBackground;
    applyTextBlockBackground(
      state.page.style.textBlockBackground
    );
  }

  /* ===============================
     PAGE BACKGROUND CHANGE
  ================================ */
  pageBgInput.addEventListener("input", e => {
    const color = e.target.value;

    state.page.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
  });

  /* ===============================
     TEXT BLOCK BACKGROUND CHANGE
  ================================ */
  textBgInput.addEventListener("input", e => {
    const color = e.target.value;

    state.page.style.textBlockBackground = color;
    applyTextBlockBackground(color);
  });

  console.log("🎨 Page style toolbar initialized");
}

/* ===============================
   APPLY TEXT BLOCK STYLE
================================ */
function applyTextBlockBackground(color) {
  document
    .querySelectorAll(".cms-text-block")
    .forEach(el => {
      el.style.backgroundColor = color;
      el.style.padding = "10px";
      el.style.borderRadius = "6px";
    });
}

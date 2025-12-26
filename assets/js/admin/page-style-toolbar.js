/***************************************************
 * PAGE STYLE TOOLBAR – ADMIN ONLY
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
    <div class="page-style-title">Page Settings</div>
    <label>Background Color</label>
    <input type="color" />
  `;

  document.body.appendChild(toolbar);

  const input = toolbar.querySelector("input");

  /* LOAD SAVED VALUE */
  if (state.page?.style?.backgroundColor) {
    input.value = state.page.style.backgroundColor;
  }

  /* LIVE APPLY */
  input.oninput = e => {
    state.page.style ||= {};
    state.page.style.backgroundColor = e.target.value;
    document.body.style.backgroundColor = e.target.value;
  };
}

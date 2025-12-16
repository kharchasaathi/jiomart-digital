
/***************************************************
 * PAGE RENDERER – PART 3
 ***************************************************/

import { CMS_STATE } from "./state.js";
import { renderBlock } from "./blocks.js";
import { enableTextEditing } from "./text-edit.js";
import { initToolbar } from "./toolbar.js";
import { initSaveHandler } from "./save.js";

const root = document.getElementById("pageRoot");

export function renderPage() {
  if (!root || !CMS_STATE.page) return;

  root.innerHTML = "";

  CMS_STATE.page.blocks.forEach(block => {
    const el = renderBlock(block);
    if (el) root.appendChild(el);
  });

  if (CMS_STATE.isAdmin) {
    enableTextEditing(root);
    initToolbar();
    initSaveHandler();
  }
}

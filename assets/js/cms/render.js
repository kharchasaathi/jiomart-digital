/***************************************************
 * PAGE RENDERER – PART 2
 * Renders all blocks into pageRoot
 ***************************************************/

import { CMS_STATE } from "./state.js";
import { renderBlock } from "./blocks.js";

const root = document.getElementById("pageRoot");

export function renderPage() {
  if (!root || !CMS_STATE.page) return;

  root.innerHTML = "";

  CMS_STATE.page.blocks.forEach(block => {
    const el = renderBlock(block);
    if (el) root.appendChild(el);
  });
}

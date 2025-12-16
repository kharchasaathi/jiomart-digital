/***************************************************
 * CMS RENDER – PART 4
 * Render page blocks into DOM
 ***************************************************/

import { renderBlocks } from "./blocks.js";
import { getState } from "./state.js";

export function renderPage() {
  const root = document.getElementById("pageRoot");
  if (!root) return;

  const { page } = getState();
  if (!page) return;

  renderBlocks(root);
}

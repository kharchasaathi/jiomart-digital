/***************************************************
 * TEXT EDIT – PART 3
 * Handles inline editing of text blocks
 ***************************************************/

import { CMS_STATE } from "./state.js";
import { savePage } from "./page-store.js";

export function enableTextEditing(root) {
  if (!CMS_STATE.isAdmin) return;

  root.addEventListener("input", async (e) => {
    const blockEl = e.target.closest(".cms-block");
    if (!blockEl) return;

    const blockId = blockEl.dataset.blockId;
    const block = CMS_STATE.page.blocks.find(b => b.id === blockId);
    if (!block) return;

    block.data.html = blockEl.innerHTML;
  });
}

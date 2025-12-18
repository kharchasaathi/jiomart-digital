/***************************************************
 * TEXT EDIT – INLINE BLOCK EDITING (FINAL SAFE)
 * Handles live editing of text blocks (ADMIN ONLY)
 ***************************************************/

import { getState } from "../core/state.js";

export function enableTextEditing(root) {
  const state = getState();

  // 🔒 Admin guard
  if (!state.adminMode) {
    console.log("🚫 Text editing disabled (public mode)");
    return;
  }

  if (!root) return;

  root.addEventListener("input", (e) => {
    const blockEl = e.target.closest(".cms-text-block");
    if (!blockEl) return;

    const blockId = blockEl.dataset.blockId;
    if (!blockId) return;

    const block = state.page?.blocks?.find(b => b.id === blockId);
    if (!block) return;

    // 🔄 Update state only (save happens elsewhere)
    block.data.html = blockEl.innerHTML;
  });
}

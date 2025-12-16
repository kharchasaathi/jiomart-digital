/***************************************************
 * BLOCKS – PART 4
 * Render + Inline editable blocks
 ***************************************************/

import { getState, isAdmin } from "./state.js";
import { savePage } from "./page-store.js";
import { initToolbar } from "./editor-toolbar.js";

let activeBlockId = null;

/* Render all blocks */
export function renderBlocks(container) {
  const { page } = getState();
  if (!page || !container) return;

  container.innerHTML = "";

  page.blocks.forEach(block => {
    if (block.type === "text") {
      const el = renderTextBlock(block);
      container.appendChild(el);
    }
  });

  if (isAdmin()) {
    initToolbar();
  }
}

/* TEXT BLOCK */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block";
  div.dataset.blockId = block.id;

  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.classList.add("editable");

    div.addEventListener("focus", () => {
      activeBlockId = block.id;
    });

    div.addEventListener("input", () => {
      updateBlockContent(block.id, div.innerHTML);
    });
  }

  return div;
}

/* Update block content in state */
function updateBlockContent(blockId, html) {
  const state = getState();
  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  block.data.html = html;
}

/* Save when toolbar triggers */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Content saved");
});

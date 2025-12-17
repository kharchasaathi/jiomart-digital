/***************************************************
 * BLOCKS – FINAL SAFE VERSION
 ***************************************************/

import { getState, isAdmin } from "./state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

export function renderBlocks(container) {
  const { page } = getState();
  if (!page || !Array.isArray(page.blocks)) return;

  container.innerHTML = "";

  page.blocks.forEach(block => {
    if (block.type === "text") {
      const el = renderTextBlock(block);
      container.appendChild(el);
    }
  });

  console.log("✅ Blocks rendered");
}

function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block";
  div.dataset.blockId = block.id;

  // 🔐 HARD SAFETY
  if (!block.data) block.data = {};
  if (!block.data.html) block.data.html = "<p>Edit this text</p>";

  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.classList.add("editable");

    div.addEventListener("focus", () => {
      activeBlockId = block.id;
    });

    div.addEventListener("input", () => {
      updateBlock(block.id, div.innerHTML);
    });
  }

  return div;
}

function updateBlock(blockId, html) {
  const state = getState();
  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  block.data.html = html;
}

document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Saved");
});

/***************************************************
 * BLOCKS – SAFE + ADMIN READY
 ***************************************************/
import { getState, isAdmin } from "./state.js";
import { savePage } from "./page-store.js";
import { initToolbar } from "./editor-toolbar.js";

let activeBlockId = null;

export function renderBlocks(container) {
  const state = getState();
  if (!state || !state.page) return;

  const blocks = Array.isArray(state.page.blocks)
    ? state.page.blocks
    : [];

  container.innerHTML = "";

  blocks.forEach((block, index) => {
    if (!block || !block.type) return;

    if (block.type === "text") {
      container.appendChild(renderTextBlock(block, index));
    }
  });

  if (isAdmin()) initToolbar();
}

/* TEXT BLOCK (SAFE) */
function renderTextBlock(block, index) {
  const div = document.createElement("div");
  div.className = "cms-text-block";

  const blockId = block.id || `block-${index}`;
  div.dataset.blockId = blockId;

  // 🔒 SAFE HTML
  const html =
    block?.data?.html ??
    block?.html ??
    "<p>Empty block</p>";

  div.innerHTML = html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.classList.add("editable");

    div.addEventListener("focus", () => {
      activeBlockId = blockId;
    });

    div.addEventListener("input", () => {
      updateBlock(blockId, div.innerHTML);
    });
  }

  return div;
}

/* Update state */
function updateBlock(blockId, html) {
  const state = getState();
  if (!state?.page?.blocks) return;

  const block = state.page.blocks.find(
    b => b.id === blockId
  );
  if (!block) return;

  if (!block.data) block.data = {};
  block.data.html = html;
}

/* Save trigger */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state?.page) return;

  await savePage(state.page);
  alert("✅ Saved");
});

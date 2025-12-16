/***************************************************
 * BLOCKS – PART 4
 * Render + Inline editable blocks
 * SAFE for Admin + Public
 ***************************************************/

import { getState, isAdmin } from "./state.js";
import { savePage } from "./page-store.js";
import { initToolbar } from "./editor-toolbar.js";

let activeBlockId = null;

/* ===============================
   Render all blocks
================================ */
export function renderBlocks(container) {
  const { page } = getState();
  if (!page || !container || !Array.isArray(page.blocks)) {
    console.warn("⚠️ No page / blocks to render");
    return;
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    if (!block || !block.type) return;

    let el = null;

    if (block.type === "text") {
      el = renderTextBlock(block);
    }

    if (el) container.appendChild(el);
  });

  if (isAdmin()) {
    initToolbar();
  }
}

/* ===============================
   TEXT BLOCK
================================ */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block";
  div.dataset.blockId = block.id || "";

  // ✅ SAFE HTML RESOLUTION (ADMIN + PUBLIC)
  const html =
    block?.data?.html ||
    block?.content?.html ||
    block?.html ||
    "";

  div.innerHTML = html;

  // 🛠 Admin only features
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

/* ===============================
   Update block content in state
================================ */
function updateBlockContent(blockId, html) {
  const state = getState();
  if (!state.page || !Array.isArray(state.page.blocks)) return;

  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  // ✅ Ensure structure exists
  if (!block.data) block.data = {};
  block.data.html = html;
}

/* ===============================
   Save when toolbar triggers
================================ */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Content saved");
});

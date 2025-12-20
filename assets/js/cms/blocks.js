/***************************************************
 * BLOCKS – FINAL VERIFIED VERSION (FIXED)
 * Phase 3.1 + 3.2 + 3.3
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";
import { renderPage } from "./render.js"; // 🔥 ADD THIS

let activeBlockId = null;

/* =================================================
   RENDER ALL BLOCKS
================================================= */
export function renderBlocks(container) {
  if (!container) return;

  const state = getState();
  const page = state.page;
  if (!page) return;

  if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
    page.blocks = createDefaultBlocks();
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "cms-block-wrapper";
    wrapper.dataset.blockId = block.id;

    let el;
    switch (block.type) {
      case "text":
        el = renderTextBlock(block);
        break;
      case "image":
        el = renderImageBlock(block);
        break;
      case "video":
        el = renderVideoBlock(block);
        break;
      default:
        return;
    }

    if (isAdmin()) {
      const del = document.createElement("button");
      del.className = "block-delete-btn";
      del.textContent = "✖";

      del.addEventListener("click", e => {
        e.stopPropagation();
        deleteBlock(block.id);
      });

      wrapper.appendChild(del);
    }

    wrapper.appendChild(el);
    container.appendChild(wrapper);
  });
}

/* ================= TEXT BLOCK ================= */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";
  div.dataset.blockId = block.id;

  block.data ||= {};
  block.data.html ||= `<p>Edit this content</p>`;
  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.spellcheck = true;

    div.addEventListener("focus", () => activeBlockId = block.id);
    div.addEventListener("click", () => activeBlockId = block.id);
    div.addEventListener("input", () => {
      updateBlock(block.id, div.innerHTML);
    });
  }

  return div;
}

/* ================= IMAGE BLOCK ================= */
function renderImageBlock(block) {
  const wrap = document.createElement("div");
  wrap.className = "cms-image-block";
  wrap.dataset.blockId = block.id;

  block.data ||= {};

  wrap.innerHTML = block.data.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">🖼 Image Block</div>`;

  if (isAdmin()) wrap.addEventListener("click", () => activeBlockId = block.id);
  return wrap;
}

/* ================= VIDEO BLOCK ================= */
function renderVideoBlock(block) {
  const wrap = document.createElement("div");
  wrap.className = "cms-video-block";
  wrap.dataset.blockId = block.id;

  block.data ||= {};

  wrap.innerHTML = block.data.src
    ? `<video controls width="100%"><source src="${block.data.src}"></video>`
    : `<div class="media-placeholder">🎥 Video Block</div>`;

  if (isAdmin()) wrap.addEventListener("click", () => activeBlockId = block.id);
  return wrap;
}

/* ================= ADD BLOCK ================= */
export function addBlock(type = "text") {
  const state = getState();
  const page = state.page;
  if (!page) return;

  const newBlock = { id: "block-" + Date.now(), type, data: {} };
  const index = page.blocks.findIndex(b => b.id === activeBlockId);

  index === -1
    ? page.blocks.push(newBlock)
    : page.blocks.splice(index + 1, 0, newBlock);

  renderPage(); // 🔥 CRITICAL FIX
}

/* ================= DELETE BLOCK ================= */
function deleteBlock(blockId) {
  if (!confirm("ఈ block delete చేయాలా?")) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== blockId);
  activeBlockId = null;

  renderPage(); // 🔥 CRITICAL FIX
}

/* ================= UPDATE BLOCK ================= */
function updateBlock(blockId, html) {
  const block = getState().page.blocks.find(b => b.id === blockId);
  if (block) block.data.html = html;
}

/* ================= DEFAULT BLOCKS ================= */
function createDefaultBlocks() {
  return [
    { id: "hero", type: "text", data: { html: "<h1>Welcome to JioMart Digital</h1>" } },
    { id: "hero-image", type: "image", data: {} },
    { id: "features", type: "text", data: { html: "<h2>Why Shop With Us?</h2>" } },
    { id: "promo-video", type: "video", data: {} },
    { id: "footer", type: "text", data: { html: "© 2025 JioMart Digital" } }
  ];
}

/* ================= SAVE ================= */
document.addEventListener("cms-save", async () => {
  await savePage(getState().page);
  alert("✅ Content saved successfully");
});

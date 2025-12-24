/***************************************************
 * BLOCKS – FINAL STABLE (ADMIN EDIT SAFE)
 * ✔ Text / Image / Video blocks
 * ✔ Admin-only editing
 * ✔ NO re-render while typing
 * ✔ Cursor / Enter / Selection SAFE
 * ✔ Toolbar + Fonts + Telugu fully working
 ***************************************************/

import { getState, setActiveBlock } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

/* ===============================
   RENDER BLOCKS
================================ */
export function renderBlocks(container) {
  const state = getState();
  const page = state.page;
  if (!page || !Array.isArray(page.blocks)) return;

  container.innerHTML = "";

  page.blocks.forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "cms-block-wrapper";
    wrapper.dataset.blockId = block.id;
    wrapper.style.position = "relative";

    let blockEl;
    if (block.type === "text") blockEl = renderTextBlock(block);
    if (block.type === "image") blockEl = renderImageBlock(block);
    if (block.type === "video") blockEl = renderVideoBlock(block);

    /* ❌ DELETE BUTTON (ADMIN ONLY) */
    if (state.adminMode) {
      const del = document.createElement("button");
      del.className = "block-delete-btn";
      del.textContent = "✖";
      del.onclick = e => {
        e.stopPropagation();
        deleteBlock(block.id);
      };
      wrapper.appendChild(del);
    }

    wrapper.appendChild(blockEl);
    container.appendChild(wrapper);
  });

  console.log("🧱 Blocks rendered");
}

/* ===============================
   TEXT BLOCK (FINAL SAFE)
================================ */
function renderTextBlock(block) {
  const blockEl = document.createElement("div");

  /* 🔥 REQUIRED CLASSES */
  blockEl.className = "cms-text-block cms-block block-text";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  blockEl.innerHTML = block.data.html;

  /* ✅ APPLY SAVED STYLES */
  applyTextStyles(blockEl, block.data.style);

  const state = getState();

  if (state.adminMode) {
    blockEl.contentEditable = "true";
    blockEl.classList.add("editable");

    const activate = () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    };

    blockEl.addEventListener("focus", activate);
    blockEl.addEventListener("click", activate);

    /* 🔥 LIVE HTML UPDATE (NO RERENDER) */
    blockEl.addEventListener("input", () => {
      block.data.html = blockEl.innerHTML;
    });
  }

  return blockEl;
}

/* ===============================
   APPLY TEXT STYLES (CORE FIX)
================================ */
function applyTextStyles(el, style = {}) {
  if (!style) return;

  el.style.fontSize = style.fontSize
    ? style.fontSize + "px"
    : "";

  el.style.color = style.color || "";
  el.style.fontFamily = style.fontFamily || "";
  el.style.fontWeight = style.bold ? "bold" : "normal";
  el.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
   IMAGE BLOCK
================================ */
function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-image-block cms-block";

  div.innerHTML = block.data?.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">🖼 Image Block</div>`;

  if (getState().adminMode) {
    div.addEventListener("click", () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    });
  }

  return div;
}

/* ===============================
   VIDEO BLOCK
================================ */
function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block cms-block";

  div.innerHTML = block.data?.src
    ? `<video controls src="${block.data.src}"></video>`
    : `<div class="media-placeholder">🎥 Video Block</div>`;

  if (getState().adminMode) {
    div.addEventListener("click", () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    });
  }

  return div;
}

/* ===============================
   ADD BLOCK
================================ */
export function addBlock(type) {
  const state = getState();
  const page = state.page;
  if (!page) return;

  const newBlock = {
    id: crypto.randomUUID(),
    type,
    data: {}
  };

  page.blocks.push(newBlock);
  activeBlockId = newBlock.id;
  setActiveBlock(newBlock.id);

  /* 🔥 SAFE RERENDER ONLY ON ADD */
  document.dispatchEvent(new Event("cms-rerender"));

  console.log("➕ Block added:", type);
}

/* ===============================
   DELETE BLOCK
================================ */
function deleteBlock(id) {
  if (!confirm("Delete this block?")) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(
    b => b.id !== id
  );

  activeBlockId = null;
  setActiveBlock(null);

  document.dispatchEvent(new Event("cms-rerender"));
}

/* ===============================
   SAVE PAGE
================================ */
document.addEventListener("cms-save", async () => {
  const state = getState();
  await savePage(state.page);
  alert("✅ Page saved");
});

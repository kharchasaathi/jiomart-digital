/***************************************************
 * BLOCKS – FINAL STABLE VERSION
 * Sample UI structure + Admin control
 *
 * ✅ Sample blocks on first load only
 * ✅ Admin decides where to add blocks
 * ✅ Each block has clear ❌ delete
 * ✅ No auto delete on refresh
 * ❌ No auth / state changes
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

/* =================================================
   RENDER ALL BLOCKS
================================================= */
export function renderBlocks(container) {
  if (!container) return;

  const state = getState();
  const page = state.page;

  if (!page) {
    container.innerHTML = "";
    return;
  }

  /* First time only → create sample structure */
  if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
    page.blocks = createSampleBlocks();
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    let el;

    if (block.type === "text") el = renderTextBlock(block);
    if (block.type === "image") el = renderImageBlock(block);
    if (block.type === "video") el = renderVideoBlock(block);

    if (!el) return;

    /* Delete button (admin only) */
    if (isAdmin()) {
      const del = document.createElement("button");
      del.className = "block-delete-btn";
      del.textContent = "✖";
      del.title = `Delete ${block.type} block`;

      del.onclick = e => {
        e.stopPropagation();
        deleteBlock(block.id, block.type);
      };

      el.appendChild(del);
    }

    container.appendChild(el);
  });
}

/* =================================================
   TEXT BLOCK
================================================= */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";
  div.dataset.blockId = block.id;

  block.data ||= {};
  block.data.html ||= `<p>Edit this content</p>`;

  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = true;
    div.spellcheck = true;

    div.onfocus = () => (activeBlockId = block.id);
    div.oninput = () => (block.data.html = div.innerHTML);
    div.onblur = () => (activeBlockId = null);
  }

  return div;
}

/* =================================================
   IMAGE BLOCK
================================================= */
function renderImageBlock(block) {
  const wrap = document.createElement("div");
  wrap.className = "cms-image-block";
  wrap.dataset.blockId = block.id;

  block.data ||= {};

  wrap.innerHTML = block.data.src
    ? `<img src="${block.data.src}" />`
    : `
      <div class="media-placeholder">
        🖼 Image Block<br/>
        <small>Admin: upload image later</small>
      </div>
    `;

  if (isAdmin()) {
    wrap.onclick = () => (activeBlockId = block.id);
  }

  return wrap;
}

/* =================================================
   VIDEO BLOCK
================================================= */
function renderVideoBlock(block) {
  const wrap = document.createElement("div");
  wrap.className = "cms-video-block";
  wrap.dataset.blockId = block.id;

  block.data ||= {};

  wrap.innerHTML = block.data.src
    ? `<video controls width="100%"><source src="${block.data.src}" /></video>`
    : `
      <div class="media-placeholder">
        🎥 Video Block<br/>
        <small>Product demo / review</small>
      </div>
    `;

  if (isAdmin()) {
    wrap.onclick = () => (activeBlockId = block.id);
  }

  return wrap;
}

/* =================================================
   ADD BLOCK BELOW ACTIVE
================================================= */
export function addBlock(type = "text") {
  const state = getState();
  const page = state.page;
  if (!page || !Array.isArray(page.blocks)) return;

  const newBlock = {
    id: "block-" + Date.now(),
    type,
    data: {}
  };

  const index = page.blocks.findIndex(b => b.id === activeBlockId);
  index === -1
    ? page.blocks.push(newBlock)
    : page.blocks.splice(index + 1, 0, newBlock);

  document.dispatchEvent(new Event("cms-rerender"));
}

/* =================================================
   DELETE BLOCK (CONFIRM)
================================================= */
function deleteBlock(id, type) {
  if (!confirm(`Delete this ${type} block?`)) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== id);
  activeBlockId = null;

  document.dispatchEvent(new Event("cms-rerender"));
}

/* =================================================
   SAMPLE STRUCTURE (FIRST LOAD ONLY)
================================================= */
function createSampleBlocks() {
  return [
    {
      id: "hero-text",
      type: "text",
      data: {
        html: "<h1>Welcome to JioMart Digital</h1><p>Edit this hero text</p>"
      }
    },
    { id: "banner", type: "image", data: {} },
    { id: "about", type: "text", data: {} },
    { id: "product-gallery", type: "image", data: {} },
    { id: "product-video", type: "video", data: {} }
  ];
}

/* =================================================
   SAVE HANDLER
================================================= */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;
  await savePage(state.page);
  alert("✅ Content saved");
});

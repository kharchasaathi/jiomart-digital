/***************************************************
 * BLOCKS – FINAL STABLE + UX FIXED
 * Phase 3.1 + 3.2 + 3.3
 * ✔ X per block (correct position)
 * ✔ One-time delete confirmation
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;
let deleteConfirmedOnce = false; // 🔐 one-time verification flag

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

  if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
    page.blocks = createDefaultBlocks();
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "cms-block-wrapper";
    wrapper.dataset.blockId = block.id;
    wrapper.style.position = "relative"; // ✅ FIX: X stays inside block

    let el = null;
    if (block.type === "text") el = renderTextBlock(block);
    if (block.type === "image") el = renderImageBlock(block);
    if (block.type === "video") el = renderVideoBlock(block);

    /* ❌ DELETE BUTTON (ADMIN ONLY) */
    if (isAdmin()) {
      const del = document.createElement("button");
      del.className = "block-delete-btn";
      del.innerText = "✖";
      del.title = "Delete block";

      del.onclick = e => {
        e.stopPropagation();
        deleteBlock(block.id);
      };

      wrapper.appendChild(del);
    }

    wrapper.appendChild(el);
    container.appendChild(wrapper);
  });

  console.log("✅ Blocks rendered");
}

/* =================================================
   TEXT BLOCK
================================================= */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";
  div.dataset.blockId = block.id;

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.spellcheck = true;

    div.addEventListener("focus", () => {
      activeBlockId = block.id;
    });

    div.addEventListener("input", () => {
      updateBlock(block.id, div.innerHTML);
    });

    div.addEventListener("click", () => {
      activeBlockId = block.id;
    });
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
    ? `<img src="${block.data.src}" alt="Image" />`
    : `<div class="media-placeholder">🖼 Image Block</div>`;

  if (isAdmin()) {
    wrap.addEventListener("click", () => {
      activeBlockId = block.id;
    });
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
    ? `<video controls width="100%">
         <source src="${block.data.src}" />
       </video>`
    : `<div class="media-placeholder">🎥 Video Block</div>`;

  if (isAdmin()) {
    wrap.addEventListener("click", () => {
      activeBlockId = block.id;
    });
  }

  return wrap;
}

/* =================================================
   ADD BLOCK (BELOW ACTIVE)
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

  let index = page.blocks.findIndex(b => b.id === activeBlockId);
  if (index === -1) index = page.blocks.length - 1;

  page.blocks.splice(index + 1, 0, newBlock);
  activeBlockId = newBlock.id;

  document.dispatchEvent(new Event("cms-rerender"));

  // 🔥 Auto-scroll to new block
  setTimeout(() => {
    document
      .querySelector(`[data-block-id="${newBlock.id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 50);
}

/* =================================================
   DELETE BLOCK (ONE-TIME CONFIRM)
================================================= */
function deleteBlock(blockId) {
  if (!deleteConfirmedOnce) {
    const ok = confirm("ఈ block delete చేయాలా?");
    if (!ok) return;
    deleteConfirmedOnce = true; // ✅ only once
  }

  const state = getState();
  if (!state.page) return;

  state.page.blocks = state.page.blocks.filter(b => b.id !== blockId);
  activeBlockId = null;

  document.dispatchEvent(new Event("cms-rerender"));
}

/* =================================================
   UPDATE TEXT CONTENT
================================================= */
function updateBlock(blockId, html) {
  const state = getState();
  const block = state.page.blocks.find(b => b.id === blockId);
  if (block) block.data.html = html;
}

/* =================================================
   DEFAULT BLOCKS (SAMPLE STRUCTURE)
================================================= */
function createDefaultBlocks() {
  return [
    { id: "t1", type: "text", data: { html: "<h2>Edit this content</h2>" } },
    { id: "t2", type: "text", data: { html: "<p>Type Telugu or English freely</p>" } },
    { id: "img1", type: "image", data: {} },
    { id: "vid1", type: "video", data: {} }
  ];
}

/* =================================================
   SAVE HANDLER
================================================= */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Content saved successfully");
});

/***************************************************
 * BLOCKS – FINAL VERIFIED VERSION
 * Phase 3.1 + 3.2 + 3.3 (STABLE)
 *
 * ✅ Add block below active
 * ✅ Delete block with confirmation
 * ✅ Image / Video supported
 * ❌ No security change
 * ❌ No state logic change
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

/* =================================================
   RENDER ALL BLOCKS
================================================= */
export function renderBlocks(container) {
  if (!container) {
    console.warn("❌ renderBlocks: container missing");
    return;
  }

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

    let el = null;

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
        console.warn("⚠️ Unknown block type:", block.type);
        return;
    }

    /* ===== ADMIN DELETE BUTTON ===== */
    if (isAdmin()) {
      const del = document.createElement("button");
      del.className = "block-delete-btn";
      del.innerText = "✖";
      del.title = "Delete block";

      del.addEventListener("click", e => {
        e.stopPropagation();
        deleteBlock(block.id);
      });

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
  div.className = "cms-text-block";
  div.dataset.blockId = block.id;

  if (!block.data) block.data = {};
  if (!block.data.html || block.data.html.trim() === "") {
    block.data.html = `<p>Edit this content</p>`;
  }

  div.innerHTML = block.data.html;

  if (isAdmin()) {
    div.contentEditable = "true";
    div.spellcheck = true;
    div.classList.add("editable");

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

  if (!block.data) block.data = {};

  if (block.data.src) {
    const img = document.createElement("img");
    img.src = block.data.src;
    img.alt = "Image";
    wrap.appendChild(img);
  } else {
    wrap.innerHTML = `
      <div class="media-placeholder">
        🖼 Image Block<br/>
        <small>Admin: Image will be added here</small>
      </div>
    `;
  }

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

  if (!block.data) block.data = {};

  if (block.data.src) {
    wrap.innerHTML = `
      <video controls width="100%">
        <source src="${block.data.src}" />
      </video>
    `;
  } else {
    wrap.innerHTML = `
      <div class="media-placeholder">
        🎥 Video Block<br/>
        <small>Product demo / review video</small>
      </div>
    `;
  }

  if (isAdmin()) {
    wrap.addEventListener("click", () => {
      activeBlockId = block.id;
    });
  }

  return wrap;
}

/* =================================================
   OPTION A — ADD BLOCK BELOW ACTIVE
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

  if (index === -1) {
    page.blocks.push(newBlock);
  } else {
    page.blocks.splice(index + 1, 0, newBlock);
  }

  document.dispatchEvent(new Event("cms-rerender"));
}

/* =================================================
   OPTION B — DELETE BLOCK (CONFIRM)
================================================= */
function deleteBlock(blockId) {
  if (!confirm("ఈ block delete చేయాలా?")) return;

  const state = getState();
  const page = state.page;
  if (!page || !Array.isArray(page.blocks)) return;

  page.blocks = page.blocks.filter(b => b.id !== blockId);

  if (activeBlockId === blockId) {
    activeBlockId = null;
  }

  document.dispatchEvent(new Event("cms-rerender"));
}

/* =================================================
   UPDATE BLOCK DATA
================================================= */
function updateBlock(blockId, html) {
  const state = getState();
  if (!state.page) return;

  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  block.data.html = html;
}

/* =================================================
   DEFAULT BLOCKS (FIRST LOAD)
================================================= */
function createDefaultBlocks() {
  return [
    { id: "hero", type: "text", data: { html: "<h1>Welcome to JioMart Digital</h1>" } },
    { id: "hero-image", type: "image", data: {} },
    { id: "features", type: "text", data: { html: "<h2>Why Shop With Us?</h2>" } },
    { id: "promo-video", type: "video", data: {} },
    { id: "footer", type: "text", data: { html: "© 2025 JioMart Digital" } }
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

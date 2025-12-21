/***************************************************
 * BLOCKS – FINAL STABLE (TEXT STYLE REALLY FIXED)
 * ✔ Text / Image / Video blocks
 * ✔ Font size, color, family works ✅
 * ✔ Bold / Italic toggle works ✅
 * ✔ Add / Delete / Save works
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

    let el;
    if (block.type === "text") el = renderTextBlock(block);
    if (block.type === "image") el = renderImageBlock(block);
    if (block.type === "video") el = renderVideoBlock(block);

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

    wrapper.appendChild(el);
    container.appendChild(wrapper);
  });

  console.log("🧱 Blocks rendered");
}

/* ===============================
   TEXT BLOCK (✨ STYLED – FINAL FIX)
================================ */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  div.innerHTML = block.data.html;

  // 🔥 APPLY TEXT STYLES (REAL FIX)
  applyTextStyles(div, block.data.style);

  if (getState().adminMode) {
    div.contentEditable = "true";

    div.onclick = () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    };

    div.oninput = () => {
      block.data.html = div.innerHTML;
    };
  }

  return div;
}

/* ===============================
   APPLY TEXT STYLES (🔥 REAL FIX)
   👉 Applies to inner <p>, <h1>, etc
================================ */
function applyTextStyles(el, style = {}) {
  // get all inner text elements
  const targets = el.querySelectorAll("*");
  const nodes = targets.length ? targets : [el];

  nodes.forEach(node => {
    // Font size
    if (style.fontSize) {
      node.style.fontSize = style.fontSize + "px";
    } else {
      node.style.fontSize = "";
    }

    // Color
    if (style.color) {
      node.style.color = style.color;
    } else {
      node.style.color = "";
    }

    // Font family
    if (style.fontFamily) {
      node.style.fontFamily = style.fontFamily;
    } else {
      node.style.fontFamily = "";
    }

    // Bold / Italic
    node.style.fontWeight = style.bold ? "bold" : "normal";
    node.style.fontStyle = style.italic ? "italic" : "normal";
  });
}

/* ===============================
   IMAGE BLOCK
================================ */
function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-image-block";

  div.innerHTML = block.data?.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">🖼 Image Block</div>`;

  div.onclick = () => {
    activeBlockId = block.id;
    setActiveBlock(block.id);
  };

  return div;
}

/* ===============================
   VIDEO BLOCK
================================ */
function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block";

  div.innerHTML = block.data?.src
    ? `<video controls src="${block.data.src}"></video>`
    : `<div class="media-placeholder">🎥 Video Block</div>`;

  div.onclick = () => {
    activeBlockId = block.id;
    setActiveBlock(block.id);
  };

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

  document.dispatchEvent(new Event("cms-rerender"));
  console.log("➕ Block added:", type);
}

/* ===============================
   DELETE BLOCK
================================ */
function deleteBlock(id) {
  if (!confirm("Delete this block?")) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== id);

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

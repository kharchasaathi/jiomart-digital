/***************************************************
 * BLOCKS – FINAL FIX (ADD WORKS 100%)
 ***************************************************/
import { getState } from "../core/state.js";
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

    // ❌ delete button
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
   BLOCK TYPES
================================ */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";
  div.innerHTML = block.data?.html || "<p>Edit this content</p>";

  if (getState().adminMode) {
    div.contentEditable = "true";
    div.oninput = () => {
      block.data.html = div.innerHTML;
    };
    div.onclick = () => (activeBlockId = block.id);
  }
  return div;
}

function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-image-block";
  div.innerHTML = block.data?.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">🖼 Image Block</div>`;

  div.onclick = () => (activeBlockId = block.id);
  return div;
}

function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block";
  div.innerHTML = block.data?.src
    ? `<video controls src="${block.data.src}"></video>`
    : `<div class="media-placeholder">🎥 Video Block</div>`;

  div.onclick = () => (activeBlockId = block.id);
  return div;
}

/* ===============================
   ADD BLOCK (🔥 FIXED)
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

  // ✅ ALWAYS APPEND (NO activeBlock dependency)
  page.blocks.push(newBlock);

  activeBlockId = newBlock.id;

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
  document.dispatchEvent(new Event("cms-rerender"));
}

/* ===============================
   SAVE
================================ */
document.addEventListener("cms-save", async () => {
  const state = getState();
  await savePage(state.page);
  alert("✅ Page saved");
});

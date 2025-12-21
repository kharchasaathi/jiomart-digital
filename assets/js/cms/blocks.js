
import { getState, setActiveBlock } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

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
}

/* ===============================
   TEXT BLOCK (✨ STYLED)
================================ */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block editable";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  div.innerHTML = block.data.html;

  // 🎨 APPLY STYLES
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

function applyTextStyles(el, style = {}) {
  if (style.fontSize) el.style.fontSize = style.fontSize + "px";
  if (style.color) el.style.color = style.color;
  if (style.fontFamily) el.style.fontFamily = style.fontFamily;
  if (style.bold) el.style.fontWeight = "bold";
  if (style.italic) el.style.fontStyle = "italic";
}

/* ===============================
   IMAGE / VIDEO (UNCHANGED)
================================ */
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
   ADD / DELETE / SAVE (UNCHANGED)
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
}

function deleteBlock(id) {
  if (!confirm("Delete this block?")) return;
  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== id);
  document.dispatchEvent(new Event("cms-rerender"));
}

document.addEventListener("cms-save", async () => {
  const state = getState();
  await savePage(state.page);
  alert("✅ Page saved");
});

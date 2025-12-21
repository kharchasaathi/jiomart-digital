import { getState, getActiveBlock } from "../core/state.js";

let toolbar;

function createTextToolbar() {
  toolbar = document.createElement("div");
  toolbar.id = "text-style-toolbar";
  toolbar.style.cssText = `
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    gap: 6px;
    z-index: 9999;
  `;

  toolbar.innerHTML = `
    <input type="number" id="fs" value="16" style="width:60px">
    <input type="color" id="fc">
    <select id="ff">
      <option value="system-ui">Default</option>
      <option value="Arial">Arial</option>
      <option value="'Noto Sans Telugu', sans-serif">Telugu</option>
    </select>
    <button data-b="bold">B</button>
    <button data-b="italic">I</button>
  `;

  document.body.appendChild(toolbar);

  toolbar.addEventListener("input", applyStyle);
  toolbar.addEventListener("click", applyStyle);
}

function applyStyle(e) {
  const state = getState();
  if (!state.adminMode) return;

  const blockId = getActiveBlock();
  if (!blockId) return;

  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block || block.type !== "text") return;

  block.data.style ||= {};

  if (e.target.id === "fs") block.data.style.fontSize = +e.target.value;
  if (e.target.id === "fc") block.data.style.color = e.target.value;
  if (e.target.id === "ff") block.data.style.fontFamily = e.target.value;

  if (e.target.dataset.b === "bold")
    block.data.style.bold = !block.data.style.bold;

  if (e.target.dataset.b === "italic")
    block.data.style.italic = !block.data.style.italic;

  document.dispatchEvent(new Event("cms-rerender"));
}

document.addEventListener("ADMIN_STATE_CHANGED", e => {
  if (e.detail?.isAdmin) {
    if (!toolbar) createTextToolbar();
  } else {
    toolbar?.remove();
    toolbar = null;
  }
});

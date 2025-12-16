/***************************************************
 * BLOCK ENGINE – PART 2
 * Converts block data → DOM
 ***************************************************/

import { CMS_STATE } from "./state.js";

/* Main block renderer */
export function renderBlock(block) {
  let el;

  switch (block.type) {
    case "text":
      el = renderTextBlock(block);
      break;

    case "image":
      el = renderImageBlock(block);
      break;

    case "product":
      el = renderProductBlock(block);
      break;

    default:
      console.warn("Unknown block:", block.type);
      return null;
  }

  el.dataset.blockId = block.id;
  el.classList.add("cms-block");

  if (CMS_STATE.isAdmin) {
    el.classList.add("editable");
  }

  return el;
}

/* ===============================
   TEXT BLOCK
================================ */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "block-text";
  div.innerHTML = block.data.html || "<p>Edit this text</p>";

  if (CMS_STATE.isAdmin) {
    div.contentEditable = true;
  }

  return div;
}

/* ===============================
   IMAGE BLOCK (placeholder)
================================ */
function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "block-image";

  const img = document.createElement("img");
  img.src = block.data.url || "";
  img.alt = block.data.caption || "";

  div.appendChild(img);
  return div;
}

/* ===============================
   PRODUCT BLOCK (placeholder)
================================ */
function renderProductBlock(block) {
  const div = document.createElement("div");
  div.className = "block-product";
  div.innerHTML = "<p>Product block</p>";
  return div;
}

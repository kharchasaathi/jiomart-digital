/***************************************************
 * BLOCKS – FINAL SAFE + STABLE VERSION
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

/**
 * Render all blocks safely
 */
export function renderBlocks(container) {
  if (!container) {
    console.warn("❌ renderBlocks: container missing");
    return;
  }

  const state = getState();
  const page = state.page;

  if (!page) {
    console.warn("⚠️ No page in state");
    container.innerHTML = "";
    return;
  }

  // 🧠 First-time page → auto create blocks
  if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
    page.blocks = createDefaultBlocks();
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    if (block.type === "text") {
      const el = renderTextBlock(block);
      container.appendChild(el);
    }
  });

  console.log("✅ Blocks rendered");
}

/**
 * Render a text block
 */
function renderTextBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-text-block";
  div.dataset.blockId = block.id;

  // 🔐 HARD SAFETY
  if (!block.data) block.data = {};
  if (!block.data.html || block.data.html.trim() === "") {
    block.data.html = getDefaultHTML();
  }

  div.innerHTML = block.data.html;

  // ✏️ Admin live editing
  if (isAdmin()) {
    div.contentEditable = "true";
    div.classList.add("editable");

    div.addEventListener("focus", () => {
      activeBlockId = block.id;
    });

    div.addEventListener("input", () => {
      updateBlock(block.id, div.innerHTML);
    });
  }

  return div;
}

/**
 * Update block content in state
 */
function updateBlock(blockId, html) {
  const state = getState();
  if (!state.page || !Array.isArray(state.page.blocks)) return;

  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  block.data.html = html;
}

/**
 * Default blocks for new page
 */
function createDefaultBlocks() {
  return [
    {
      id: "block-1",
      type: "text",
      data: {
        html: `
          <h1>Welcome to JioMart Digital</h1>
          <p>Fresh groceries delivered to your doorstep.</p>
        `
      }
    },
    {
      id: "block-2",
      type: "text",
      data: {
        html: `
          <h2>Why Shop With Us?</h2>
          <ul>
            <li>✔ Best Prices</li>
            <li>✔ Fast Delivery</li>
            <li>✔ Trusted Quality</li>
          </ul>
        `
      }
    }
  ];
}

/**
 * Default fallback HTML
 */
function getDefaultHTML() {
  return `<p>Edit this text</p>`;
}

/**
 * Save handler (toolbar / shortcut)
 */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Content saved successfully");
});

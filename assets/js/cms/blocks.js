/***************************************************
 * BLOCKS – FINAL SAFE + STABLE VERSION
 * UI PREBUILT (Hero, Features, Content, Products, Footer)
 * ❌ No security change
 * ❌ No state logic change
 ***************************************************/

import { getState, isAdmin } from "../core/state.js";
import { savePage } from "./page-store.js";

let activeBlockId = null;

/* =================================================
   RENDER ALL BLOCKS (🔥 EXPORT FIXED)
================================================= */
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

  /* First-time page → auto create UI blocks */
  if (!Array.isArray(page.blocks) || page.blocks.length === 0) {
    page.blocks = createDefaultBlocks();
  }

  container.innerHTML = "";

  page.blocks.forEach(block => {
    switch (block.type) {
      case "text":
        container.appendChild(renderTextBlock(block));
        break;
      default:
        console.warn("⚠️ Unknown block type:", block.type);
    }
  });

  console.log("✅ Blocks rendered");
}

/* =================================================
   TEXT BLOCK (ADMIN SAFE EDIT)
================================================= */
function renderTextBlock(block) {
  const div = document.createElement("div");

  div.className = "cms-text-block";
  div.dataset.blockId = block.id;

  /* HARD SAFETY */
  if (!block.data) block.data = {};
  if (!block.data.html || block.data.html.trim() === "") {
    block.data.html = getFallbackHTML();
  }

  div.innerHTML = block.data.html;

  /* ===== ADMIN LIVE EDITING ===== */
  if (isAdmin()) {
    div.setAttribute("contenteditable", "true");
    div.setAttribute("spellcheck", "true");
    div.classList.add("editable");

    /* 🔥 CRITICAL FIXES (cursor + typing + selection) */
    div.style.pointerEvents = "auto";
    div.style.userSelect = "text";
    div.style.caretColor = "#000";

    div.addEventListener("focus", () => {
      activeBlockId = block.id;
    });

    div.addEventListener("input", () => {
      updateBlock(block.id, div.innerHTML);
    });

    div.addEventListener("blur", () => {
      activeBlockId = null;
    });
  }

  return div;
}

/* =================================================
   UPDATE BLOCK DATA IN STATE
================================================= */
function updateBlock(blockId, html) {
  const state = getState();
  if (!state.page || !Array.isArray(state.page.blocks)) return;

  const block = state.page.blocks.find(b => b.id === blockId);
  if (!block) return;

  block.data.html = html;
}

/* =================================================
   DEFAULT UI BLOCKS (FIRST LOAD ONLY)
   👉 FULL SITE UI SKELETON
================================================= */
function createDefaultBlocks() {
  return [
    {
      id: "hero",
      type: "text",
      data: {
        html: `
<section class="hero">
  <h1>Welcome to JioMart Digital</h1>
  <p>Fresh groceries delivered to your doorstep.</p>
  <button class="hero-btn">Shop Now</button>
</section>
        `
      }
    },
    {
      id: "features",
      type: "text",
      data: {
        html: `
<section class="features">
  <h2>Why Shop With Us?</h2>
  <div class="feature">✅ Best Prices</div>
  <div class="feature">🚚 Fast Delivery</div>
  <div class="feature">🛡 Trusted Quality</div>
</section>
        `
      }
    },
    {
      id: "content",
      type: "text",
      data: {
        html: `
<section class="content-section">
  <h2>మన షాప్ ఎందుకు ప్రత్యేకం?</h2>
  <p>
    మీరు ఇక్కడ తెలుగు లేదా ఇంగ్లీష్ లో freely టైప్ చేయవచ్చు.
    ఇది పూర్తిగా editable content.
  </p>
</section>
        `
      }
    },
    {
      id: "products",
      type: "text",
      data: {
        html: `
<section class="product-grid">
  <div class="product-card">
    <img src="https://via.placeholder.com/150" />
    <p>Product Name</p>
  </div>
  <div class="product-card">
    <img src="https://via.placeholder.com/150" />
    <p>Product Name</p>
  </div>
</section>
        `
      }
    },
    {
      id: "footer",
      type: "text",
      data: {
        html: `
<footer class="site-footer">
  © 2025 JioMart Digital. All rights reserved.
</footer>
        `
      }
    }
  ];
}

/* =================================================
   FALLBACK HTML
================================================= */
function getFallbackHTML() {
  return `<p>Edit this content</p>`;
}

/* =================================================
   SAVE HANDLER (GLOBAL)
================================================= */
document.addEventListener("cms-save", async () => {
  const state = getState();
  if (!state.page) return;

  await savePage(state.page);
  alert("✅ Content saved successfully");
});

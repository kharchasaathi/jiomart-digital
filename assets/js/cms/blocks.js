/***************************************************
 * BLOCKS – FINAL ALL-IN-ONE (TEXT + IMAGE + VIDEO + TABS)
 * ✔ Full persistence
 * ✔ No rerender while typing
 * ✔ Cursor / Enter / Selection SAFE
 ***************************************************/

import { getState, setActiveBlock } from "../core/state.js";
import { savePage } from "./page-store.js";
import { uploadImage, uploadVideo } from "./media-upload.js";

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

    let blockEl;
    if (block.type === "text") blockEl = renderTextBlock(block, wrapper);
    if (block.type === "image") blockEl = renderImageBlock(block);
    if (block.type === "video") blockEl = renderVideoBlock(block);
    if (block.type === "tabs") blockEl = renderTabsBlock(block);

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

    wrapper.appendChild(blockEl);
    container.appendChild(wrapper);
  });
}

/* ===============================
   TEXT BLOCK
================================ */
function renderTextBlock(block, wrapper) {
  const el = document.createElement("div");
  el.className = "cms-text-block cms-block block-text editable";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  el.innerHTML = block.data.html;

  applyTextStyles(el, block.data.style);
  el.querySelectorAll("*").forEach(c =>
    applyTextStyles(c, block.data.style)
  );

  if (block.data.style.backgroundColor) {
    wrapper.classList.add("has-bg");
    wrapper.style.setProperty("--block-bg", block.data.style.backgroundColor);
  } else {
    wrapper.classList.remove("has-bg");
    wrapper.style.removeProperty("--block-bg");
  }

  if (getState().adminMode) {
    el.contentEditable = "true";

    const activate = () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    };

    el.addEventListener("focus", activate);
    el.addEventListener("click", activate); // 🔥 RESTORED
    el.addEventListener("input", () => {
      block.data.html = el.innerHTML;
    });
  }

  return el;
}

/* ===============================
   TABS BLOCK (FULL + SAFE)
================================ */
function renderTabsBlock(block) {
  block.data ||= {};
  block.data.active ??= 0;
  block.data.tabs ??= [];

  if (!Array.isArray(block.data.tabs)) block.data.tabs = [];

  if (block.data.tabs.length === 0) {
    block.data.tabs.push({
      title: "Tab 1",
      html: "<p>Tab content</p>",
      style: {}
    });
  }

  const root = document.createElement("div");
  root.className = "cms-tabs-block cms-block";

  const tabsBar = document.createElement("div");
  tabsBar.className = "tabs-bar";

  const content = document.createElement("div");
  content.className = "tabs-content";

  block.data.tabs.forEach((tab, i) => {
    const btn = document.createElement("button");
btn.textContent = tab.title;

if (i === block.data.active) btn.classList.add("active");

/* Single click → switch tab */
btn.onclick = () => {
  block.data.active = i;
  document.dispatchEvent(new Event("cms-rerender"));
};

/* Double click → edit title (ADMIN only) */
if (getState().adminMode) {
  btn.ondblclick = e => {
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "text";
    input.value = tab.title;
    input.style.width = "80px";

    btn.replaceWith(input);
    input.focus();

    const saveTitle = () => {
      tab.title = input.value || "Tab";
      document.dispatchEvent(new Event("cms-rerender"));
    };

    input.onblur = saveTitle;
    input.onkeydown = e => {
      if (e.key === "Enter") saveTitle();
    };
  };
}

    tabsBar.appendChild(btn);
  });

  if (getState().adminMode) {
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.onclick = () => {
      block.data.tabs.push({
        title: "New Tab",
        html: "<p>New content</p>",
        style: {}
      });
      block.data.active = block.data.tabs.length - 1;
      document.dispatchEvent(new Event("cms-rerender"));
    };
    tabsBar.appendChild(addBtn);
  }

  const activeTab = block.data.tabs[block.data.active];
  const editable = document.createElement("div");
  editable.className = "editable";
  editable.contentEditable = getState().adminMode;
  editable.innerHTML = activeTab.html;

  applyTextStyles(editable, activeTab.style);

  editable.addEventListener("input", () => {
    activeTab.html = editable.innerHTML;
  });

  editable.addEventListener("focus", () => {
    activeBlockId = block.id;
    setActiveBlock(block.id);
  });

  content.appendChild(editable);
  root.appendChild(tabsBar);
  root.appendChild(content);

  return root;
}

/* ===============================
   IMAGE BLOCK
================================ */
function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-image-block cms-block";

  block.data ||= {};

  div.innerHTML = block.data.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">Upload Image</div>`;

  if (getState().adminMode) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;

      const url = await uploadImage(file);
      if (!url) return;

      block.data.src = url;
      document.dispatchEvent(new Event("cms-rerender"));
    };

    div.appendChild(input);
  }

  return div;
}

/* ===============================
   VIDEO BLOCK
================================ */
function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block cms-block";

  block.data ||= {};

  if (!block.data.src) {
    div.innerHTML = `<div class="media-placeholder">Video Block</div>`;
  } else {
    div.innerHTML =
      block.data.type === "youtube"
        ? `<iframe src="${block.data.src}" allowfullscreen></iframe>`
        : `<video controls src="${block.data.src}"></video>`;
  }

  return div;
}

/* ===============================
   HELPERS
================================ */
function applyTextStyles(el, style = {}) {
  el.style.fontSize = style.fontSize ? style.fontSize + "px" : "";
  el.style.color = style.color || "";
  el.style.fontFamily = style.fontFamily
    ? `"${style.fontFamily}", system-ui, sans-serif`
    : "";
  el.style.fontWeight = style.bold ? "bold" : "normal";
  el.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
   ADD / DELETE / SAVE
================================ */
export function addBlock(type) {
  const state = getState();
  if (!state.page) return;

  let data = {};

  if (type === "text") {
    data = { html: "<p>Edit text</p>", style: {} };
  }

  if (type === "image") {
    data = {};
  }

  if (type === "video") {
    data = {};
  }

  if (type === "tabs") {
    data = {
      active: 0,
      tabs: [{ title: "Tab 1", html: "<p>Tab content</p>", style: {} }]
    };
  }

  state.page.blocks.push({
    id: crypto.randomUUID(),
    type,
    data
  });

  document.dispatchEvent(new Event("cms-rerender"));
}

function deleteBlock(id) {
  if (!confirm("Delete this block?")) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== id);
  setActiveBlock(null);

  document.dispatchEvent(new Event("cms-rerender"));
}

document.addEventListener("cms-save", async () => {
  await savePage(getState().page);
  alert("Page saved");
});

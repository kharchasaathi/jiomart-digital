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
   TEXT BLOCK (FULL REHYDRATION)
================================ */
function renderTextBlock(block, wrapper) {
  const el = document.createElement("div");
  el.className = "cms-text-block cms-block block-text editable";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  el.innerHTML = block.data.html;

  applyTextStyles(el, block.data.style);
  el.querySelectorAll("*").forEach(child =>
    applyTextStyles(child, block.data.style)
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
    el.addEventListener("click", activate);
    el.addEventListener("input", () => {
      block.data.html = el.innerHTML;
    });
  }

  return el;
}

/* ===============================
   TABS BLOCK (NEW – SAFE)
================================ */
function renderTabsBlock(block) {
  block.data ||= {
    active: 0,
    tabs: [
      { title: "Tab 1", html: "<p>Tab content</p>", style: {} }
    ]
  };

  const root = document.createElement("div");
  root.className = "cms-tabs-block cms-block";

  const tabsBar = document.createElement("div");
  tabsBar.className = "tabs-bar";

  const content = document.createElement("div");
  content.className = "tabs-content";

  block.data.tabs.forEach((tab, i) => {
    const btn = document.createElement("button");
    btn.textContent = tab.title;
    btn.className = i === block.data.active ? "active" : "";
    btn.onclick = () => {
      block.data.active = i;
      document.dispatchEvent(new Event("cms-rerender"));
    };
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
  editable.querySelectorAll("*").forEach(c =>
    applyTextStyles(c, activeTab.style)
  );

  editable.onfocus = () => {
    activeBlockId = block.id;
    setActiveBlock(block.id);
  };
  editable.oninput = () => (activeTab.html = editable.innerHTML);

  content.appendChild(editable);

  root.appendChild(tabsBar);
  root.appendChild(content);

  return root;
}

/* ===============================
   IMAGE BLOCK (UNCHANGED & SAFE)
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
    input.style.marginTop = "10px";

    input.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;

      div.innerHTML = "Uploading image...";
      const url = await uploadImage(file);
      if (!url) return;

      block.data.src = url;
      document.dispatchEvent(new Event("cms-rerender"));
    };

    div.appendChild(input);

    div.addEventListener("click", () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    });
  }

  return div;
}

/* ===============================
   VIDEO BLOCK (FULL RESTORED)
================================ */
function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block cms-block";

  block.data ||= {};

  function renderVideo() {
    if (!block.data.src) {
      div.innerHTML = `<div class="media-placeholder">Video Block</div>`;
      return;
    }

    div.innerHTML =
      block.data.type === "youtube"
        ? `<iframe src="${block.data.src}" frameborder="0" allowfullscreen></iframe>`
        : `<video controls src="${block.data.src}"></video>`;
  }

  renderVideo();

  if (getState().adminMode) {
    const ytInput = document.createElement("input");
    ytInput.type = "text";
    ytInput.placeholder = "Paste YouTube URL";
    ytInput.style.marginTop = "10px";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/mp4";
    fileInput.style.marginTop = "10px";

    ytInput.onchange = () => {
      const url = ytInput.value.trim();
      if (!url) return;

      let id = null;
      try {
        id = url.includes("youtu.be")
          ? url.split("/").pop()
          : new URL(url).searchParams.get("v");
      } catch {}

      if (!id) return alert("Invalid YouTube URL");

      block.data.type = "youtube";
      block.data.src = `https://www.youtube.com/embed/${id}`;
      document.dispatchEvent(new Event("cms-rerender"));
    };

    fileInput.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;

      const url = await uploadVideo(file);
      if (!url) return;

      block.data.type = "upload";
      block.data.src = url;
      document.dispatchEvent(new Event("cms-rerender"));
    };

    div.appendChild(ytInput);
    div.appendChild(fileInput);

    div.addEventListener("click", () => {
      activeBlockId = block.id;
      setActiveBlock(block.id);
    });
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

  state.page.blocks.push({
    id: crypto.randomUUID(),
    type,
    data: {}
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

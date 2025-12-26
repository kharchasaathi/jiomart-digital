/***************************************************
 * BLOCKS – FINAL STABLE (ADMIN EDIT SAFE)
 * ✔ Text / Image / Video blocks
 * ✔ Admin-only editing
 * ✔ NO re-render while typing
 * ✔ Cursor / Enter / Selection SAFE
 * ✔ Toolbar + Fonts + Telugu fully working
 * ✔ Image upload (Phase-1 direct)
 * ✔ Video: YouTube + Upload (Phase-1)
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
    if (block.type === "text") blockEl = renderTextBlock(block);
    if (block.type === "image") blockEl = renderImageBlock(block);
    if (block.type === "video") blockEl = renderVideoBlock(block);

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

  console.log("🧱 Blocks rendered");
}

/* ===============================
   TEXT BLOCK (UNCHANGED)
================================ */
function renderTextBlock(block) {
  const el = document.createElement("div");
  el.className = "cms-text-block cms-block block-text";

  block.data ||= {};
  block.data.html ||= "<p>Edit this content</p>";
  block.data.style ||= {};

  el.innerHTML = block.data.html;
  applyTextStyles(el, block.data.style);

  if (getState().adminMode) {
    el.contentEditable = "true";
    el.classList.add("editable");

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
   APPLY TEXT STYLES
================================ */
function applyTextStyles(el, style = {}) {
  el.style.fontSize = style.fontSize ? style.fontSize + "px" : "";
  el.style.color = style.color || "";
  el.style.fontFamily = style.fontFamily || "";
  el.style.fontWeight = style.bold ? "bold" : "normal";
  el.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
   IMAGE BLOCK (UNCHANGED)
================================ */
function renderImageBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-image-block cms-block";

  block.data ||= {};

  div.innerHTML = block.data.src
    ? `<img src="${block.data.src}" />`
    : `<div class="media-placeholder">🖼 Upload Image</div>`;

  if (getState().adminMode) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.marginTop = "10px";

    input.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;

      div.innerHTML = "⏳ Uploading image...";
      const url = await uploadImage(file);
      if (!url) return;

      block.data.src = url;
      div.innerHTML = `<img src="${url}" />`;
      div.appendChild(input);
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
   VIDEO BLOCK (PHASE-1 SAFE)
================================ */
function renderVideoBlock(block) {
  const div = document.createElement("div");
  div.className = "cms-video-block cms-block";

  block.data ||= {};

  function renderVideo() {
    if (!block.data.src) {
      div.innerHTML = `<div class="media-placeholder">🎥 Video Block</div>`;
      return;
    }

    if (block.data.type === "youtube") {
      div.innerHTML = `
        <iframe
          src="${block.data.src}"
          frameborder="0"
          allowfullscreen
        ></iframe>`;
    } else {
      div.innerHTML = `
        <video controls src="${block.data.src}"></video>`;
    }
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

      if (!id) {
        alert("Invalid YouTube URL");
        return;
      }

      block.data.type = "youtube";
      block.data.src = `https://www.youtube.com/embed/${id}`;
      renderVideo();
      div.appendChild(ytInput);
      div.appendChild(fileInput);
    };

    fileInput.onchange = async e => {
      const file = e.target.files[0];
      if (!file) return;

      div.innerHTML = "⏳ Uploading video...";
      const url = await uploadVideo(file);
      if (!url) return;

      block.data.type = "upload";
      block.data.src = url;
      renderVideo();
      div.appendChild(ytInput);
      div.appendChild(fileInput);
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
   ADD / DELETE / SAVE (UNCHANGED)
================================ */
export function addBlock(type) {
  const state = getState();
  if (!state.page) return;

  const block = {
    id: crypto.randomUUID(),
    type,
    data: {}
  };

  state.page.blocks.push(block);
  activeBlockId = block.id;
  setActiveBlock(block.id);

  document.dispatchEvent(new Event("cms-rerender"));
}

function deleteBlock(id) {
  if (!confirm("Delete this block?")) return;

  const state = getState();
  state.page.blocks = state.page.blocks.filter(b => b.id !== id);
  activeBlockId = null;
  setActiveBlock(null);

  document.dispatchEvent(new Event("cms-rerender"));
}

document.addEventListener("cms-save", async () => {
  const state = getState();
  await savePage(state.page);
  alert("✅ Page saved");
});

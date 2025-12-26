/***************************************************

ADMIN TEXT TOOLBAR – FINAL (BLOCK ATTACHED)

✔ Root + inner text styling preserved

✔ Text block background color (STEP-3 FIXED)

✔ Wrapper-based background (CSS safe)

✔ Instant repaint (cursor safe)
***************************************************/


import { getActiveBlock, getState } from "../core/state.js";

let toolbar = null;

/* ===============================
🔥 FORCE REPAINT (CRITICAL FIX)
================================ */
function forceRepaint(el) {
if (!el) return;

if (el.isContentEditable) {
const wrapper = el.closest(".cms-block-wrapper");

el.contentEditable = "false";  
el.offsetHeight; // force reflow  
el.contentEditable = "true";  
el.focus();  

// 🔥 repaint wrapper also  
wrapper?.offsetHeight;

}
}

/* ===============================
CREATE TOOLBAR (ONCE)
================================ */
function createToolbar() {
if (toolbar) return;

toolbar = document.createElement("div");
toolbar.className = "admin-text-toolbar";

toolbar.innerHTML = `
<input type="number" min="10" max="80" title="Font size" />
<input type="color" title="Text color" />
<input type="color" title="Text block background" data-bg />

<select title="Font family">  
  <option value="">Default</option>  

  <optgroup label="English Fonts">  
    <option value="Poppins">Poppins</option>  
    <option value="Roboto">Roboto</option>  
    <option value="Montserrat">Montserrat</option>  
    <option value="Inter">Inter</option>  
    <option value="Open Sans">Open Sans</option>  
    <option value="Lato">Lato</option>  
    <option value="Nunito">Nunito</option>  
    <option value="Raleway">Raleway</option>  
    <option value="Playfair Display">Playfair Display</option>  
    <option value="Merriweather">Merriweather</option>  
  </optgroup>  

  <optgroup label="Telugu Fonts">  
    <option value="Noto Sans Telugu">Noto Sans Telugu</option>  
    <option value="Ramabhadra">Ramabhadra</option>  
    <option value="NTR">NTR</option>  
    <option value="Gurajada">Gurajada</option>  
    <option value="Suranna">Suranna</option>  
    <option value="Pothana2000">Pothana2000</option>  
    <option value="Timmana">Timmana</option>  
    <option value="Mallanna">Mallanna</option>  
    <option value="Tenali Ramakrishna">Tenali Ramakrishna</option>  
    <option value="Sree Krushnadevaraya">Sree Krushnadevaraya</option>  
  </optgroup>  
</select>  

<button data-style="bold"><b>B</b></button>  
<button data-style="italic"><i>I</i></button>

`;

toolbar.style.display = "none";
toolbar.addEventListener("input", onChange);
toolbar.addEventListener("click", onClick);
}

/* ===============================
ATTACH TOOLBAR
================================ */
function attachToolbar(blockEl) {
toolbar.remove();
blockEl.after(toolbar);
toolbar.style.display = "flex";
}

/* ===============================
APPLY STYLES (TEXT + WRAPPER)
================================ */
function applyStylesToElement(blockEl, style = {}) {
if (!blockEl) return;

// TEXT STYLES
applyStyle(blockEl, style);
blockEl.querySelectorAll("*").forEach(el => {
applyStyle(el, style);
});

/* ✅ TEXT BLOCK BACKGROUND → WRAPPER */
const wrapper = blockEl.closest(".cms-block-wrapper");

if (wrapper && style.backgroundColor) {
wrapper.style.backgroundColor = style.backgroundColor;
wrapper.style.padding = "12px";
wrapper.style.borderRadius = "8px";
} else if (wrapper) {
wrapper.style.backgroundColor = "";
wrapper.style.padding = "";
wrapper.style.borderRadius = "";
}
}

function applyStyle(el, style) {
el.style.fontSize = style.fontSize
? style.fontSize + "px"
: "";

el.style.color = style.color || "";

el.style.fontFamily = style.fontFamily
? "${style.fontFamily}", system-ui, sans-serif
: "";

el.style.fontWeight = style.bold ? "bold" : "normal";
el.style.fontStyle = style.italic ? "italic" : "normal";
}

/* ===============================
INPUT HANDLER
================================ */
function onChange(e) {
const block = getSelectedBlock();
if (!block) return;

block.data.style ||= {};

if (e.target.type === "number") {
block.data.style.fontSize = Number(e.target.value);
}

if (e.target.type === "color" && !e.target.dataset.bg) {
block.data.style.color = e.target.value;
}

if (e.target.dataset.bg) {
block.data.style.backgroundColor = e.target.value;
}

if (e.target.tagName === "SELECT") {
block.data.style.fontFamily = e.target.value;
}

const el = getActiveBlockElement();
applyStylesToElement(el, block.data.style);
forceRepaint(el);
}

/* ===============================
BUTTON HANDLER
================================ */
function onClick(e) {
const btn = e.target.closest("button");
if (!btn) return;

const block = getSelectedBlock();
if (!block) return;

block.data.style ||= {};

if (btn.dataset.style === "bold") {
block.data.style.bold = !block.data.style.bold;
}

if (btn.dataset.style === "italic") {
block.data.style.italic = !block.data.style.italic;
}

const el = getActiveBlockElement();
applyStylesToElement(el, block.data.style);
forceRepaint(el);
}

/* ===============================
HELPERS
================================ */
function getSelectedBlock() {
const state = getState();
const id = getActiveBlock();

return state.page?.blocks.find(
b => b.id === id && b.type === "text"
);
}

function getActiveBlockElement() {
const id = getActiveBlock();
return document.querySelector(
.cms-block-wrapper[data-block-id="${id}"] .cms-text-block
);
}

/* ===============================
BLOCK CLICK
================================ */
document.addEventListener("click", e => {
const blockEl = e.target.closest(".cms-text-block.editable");
if (!blockEl) return;
if (!getState().adminMode) return;

createToolbar();
attachToolbar(blockEl);

const block = getSelectedBlock();
if (block?.data?.style) {
applyStylesToElement(blockEl, block.data.style);
forceRepaint(blockEl);
}
});

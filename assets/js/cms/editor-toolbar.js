/***************************************************
 * FLOATING TEXT EDITOR TOOLBAR – PHASE 2A
 ***************************************************/
import { isAdmin } from "../core/state.js";

let toolbar;

/* Create toolbar once */
function createToolbar() {
  toolbar = document.createElement("div");
  toolbar.id = "cms-toolbar";

  toolbar.innerHTML = `
    <button data-cmd="bold"><b>B</b></button>
    <button data-cmd="italic"><i>I</i></button>
    <button data-cmd="underline"><u>U</u></button>

    <input type="color" id="textColor" title="Text Color" />

    <select id="fontSize">
      <option value="14px">14</option>
      <option value="16px" selected>16</option>
      <option value="18px">18</option>
      <option value="22px">22</option>
      <option value="28px">28</option>
    </select>
  `;

  document.body.appendChild(toolbar);

  /* Commands */
  toolbar.addEventListener("click", e => {
    const cmd = e.target.closest("button")?.dataset.cmd;
    if (cmd) document.execCommand(cmd, false, null);
  });

  /* Color */
  toolbar.querySelector("#textColor").addEventListener("input", e => {
    document.execCommand("foreColor", false, e.target.value);
  });

  /* Font size */
  toolbar.querySelector("#fontSize").addEventListener("change", e => {
    document.execCommand("fontSize", false, "7");

    const fonts = document.getElementsByTagName("font");
    for (let font of fonts) {
      if (font.size === "7") {
        font.removeAttribute("size");
        font.style.fontSize = e.target.value;
      }
    }
  });
}

/* Position toolbar near selection */
function positionToolbar() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const rect = selection.getRangeAt(0).getBoundingClientRect();
  toolbar.style.top = `${rect.top - 48 + window.scrollY}px`;
  toolbar.style.left = `${rect.left}px`;
}

/* Init */
export function initEditorToolbar() {
  if (!isAdmin()) return;

  if (!toolbar) createToolbar();

  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      toolbar.style.display = "none";
      return;
    }

    toolbar.style.display = "flex";
    positionToolbar();
  });
}

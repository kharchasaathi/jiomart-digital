/***************************************************
 * EDITOR TOOLBAR – PART 4
 * Inline rich text editor
 ***************************************************/

import { isAdmin } from "../core/state.js";

let toolbarCreated = false;

export function initToolbar() {
  if (toolbarCreated || !isAdmin()) return;
  toolbarCreated = true;

  const bar = document.createElement("div");
  bar.id = "editorToolbar";

  bar.innerHTML = `
    <button data-cmd="bold"><b>B</b></button>
    <button data-cmd="underline"><u>U</u></button>

    <input type="color" data-cmd="foreColor" title="Text Color">

    <select data-cmd="fontName">
      <option value="Poppins">Poppins</option>
      <option value="Roboto">Roboto</option>
      <option value="Inter">Inter</option>
      <option value="Lato">Lato</option>
      <option value="Noto Sans Telugu">Noto Sans Telugu</option>
      <option value="Mandali">Mandali</option>
    </select>

    <button id="saveText">💾 Save</button>
  `;

  document.body.appendChild(bar);

  bar.addEventListener("change", handleCommand);
  bar.addEventListener("click", handleCommand);

  bar.querySelector("#saveText").onclick = () => {
    document.dispatchEvent(new Event("cms-save"));
  };
}

function handleCommand(e) {
  const cmd = e.target.dataset.cmd;
  if (!cmd) return;

  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
    document.execCommand(cmd, false, e.target.value);
  } else {
    document.execCommand(cmd, false, null);
  }
}

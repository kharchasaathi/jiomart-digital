/***************************************************
 * FLOATING TEXT EDITOR TOOLBAR – PHASE 2A (FINAL)
 * ✔ Admin state sync fixed
 * ✔ Toolbar shows only after admin login
 ***************************************************/

import { isAdmin } from "../core/state.js";

let toolbar = null;
let toolbarCreated = false;

/* ===============================
   CREATE TOOLBAR (ONCE)
================================ */
function createToolbar() {
  if (toolbarCreated) return;

  toolbar = document.createElement("div");
  toolbar.id = "cms-toolbar";
  toolbar.className = "editor-toolbar";

  Object.assign(toolbar.style, {
    position: "absolute",
    zIndex: "99999",
    display: "none",
    background: "#111",
    padding: "8px",
    borderRadius: "10px",
    gap: "6px",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
  });

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
  toolbarCreated = true;

  /* ===============================
     TEXT COMMANDS
  ================================ */
  toolbar.addEventListener("click", e => {
    const cmd = e.target.closest("button")?.dataset.cmd;
    if (cmd) {
      document.execCommand(cmd, false, null);
    }
  });

  /* Text color */
  toolbar
    .querySelector("#textColor")
    .addEventListener("input", e => {
      document.execCommand("foreColor", false, e.target.value);
    });

  /* Font size */
  toolbar
    .querySelector("#fontSize")
    .addEventListener("change", e => {
      document.execCommand("fontSize", false, "7");

      const fonts = document.getElementsByTagName("font");
      for (let font of fonts) {
        if (font.size === "7") {
          font.removeAttribute("size");
          font.style.fontSize = e.target.value;
        }
      }
    });

  console.log("🧰 Floating text toolbar created");
}

/* ===============================
   POSITION TOOLBAR
================================ */
function positionToolbar() {
  if (!toolbar) return;

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const rect = selection
    .getRangeAt(0)
    .getBoundingClientRect();

  toolbar.style.top =
    rect.top - 48 + window.scrollY + "px";
  toolbar.style.left =
    rect.left + window.scrollX + "px";
}

/* ===============================
   ENABLE TOOLBAR BEHAVIOR
================================ */
function enableToolbar() {
  if (!toolbar) return;

  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();

    if (
      !selection ||
      selection.isCollapsed ||
      !document.body.classList.contains("admin-mode")
    ) {
      toolbar.style.display = "none";
      return;
    }

    toolbar.style.display = "flex";
    positionToolbar();
  });

  console.log("✏️ Floating text editor enabled");
}

/* ===============================
   ADMIN STATE LISTENER (🔥 FIX)
================================ */
document.addEventListener("ADMIN_STATE_CHANGED", e => {
  const admin =
    !!(e.detail?.adminMode ?? e.detail?.isAdmin);

  console.log(
    "🔔 ADMIN_STATE_CHANGED (text-toolbar):",
    admin
  );

  if (admin) {
    if (!toolbarCreated) createToolbar();
    enableToolbar();
  } else {
    toolbar?.remove();
    toolbar = null;
    toolbarCreated = false;
  }
});

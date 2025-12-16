/* ===============================
   EDITOR TOOLBAR ENGINE
   Safe + Error Free
================================ */

/**
 * Execute formatting command
 */
function exec(cmd, value = null) {
  if (!document.queryCommandSupported(cmd)) return;
  document.execCommand(cmd, false, value);
}

/**
 * Helper: safely bind events
 */
function bind(id, event, handler) {
  const el = document.getElementById(id);
  if (!el) return; // ✅ prevents null errors
  el.addEventListener(event, handler);
}

/* ===============================
   TOOLBAR ACTIONS
================================ */

/* Bold */
bind("boldBtn", "click", () => exec("bold"));

/* Underline */
bind("underlineBtn", "click", () => exec("underline"));

/* Font Size */
bind("fontSize", "change", (e) => {
  exec("fontSize", e.target.value);
});

/* Font Color */
bind("fontColor", "change", (e) => {
  exec("foreColor", e.target.value);
});

/* Font Family */
bind("fontFamily", "change", (e) => {
  exec("fontName", e.target.value);
});

/* ===============================
   ACTIVE EDITABLE BLOCK HANDLING
================================ */

document.addEventListener("click", (e) => {
  const editable = e.target.closest("[contenteditable='true']");
  if (!editable) return;
  editable.focus();
});

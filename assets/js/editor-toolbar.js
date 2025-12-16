function exec(cmd, value = null) {
  document.execCommand(cmd, false, value);
}

/* Toolbar actions */
document.getElementById("boldBtn").onclick = () => exec("bold");
document.getElementById("underlineBtn").onclick = () => exec("underline");

document.getElementById("fontSize").onchange = (e) =>
  exec("fontSize", e.target.value);

document.getElementById("fontColor").onchange = (e) =>
  exec("foreColor", e.target.value);

document.getElementById("fontFamily").onchange = (e) =>
  exec("fontName", e.target.value);

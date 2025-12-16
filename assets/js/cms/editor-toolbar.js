function exec(cmd, value = null) {
  document.execCommand(cmd, false, value);
}

document.addEventListener("DOMContentLoaded", () => {
  const boldBtn = document.getElementById("boldBtn");
  const underlineBtn = document.getElementById("underlineBtn");
  const fontSize = document.getElementById("fontSize");
  const fontColor = document.getElementById("fontColor");
  const fontFamily = document.getElementById("fontFamily");

  boldBtn && (boldBtn.onclick = () => exec("bold"));
  underlineBtn && (underlineBtn.onclick = () => exec("underline"));

  fontSize && (fontSize.onchange = e => exec("fontSize", e.target.value));
  fontColor && (fontColor.onchange = e => exec("foreColor", e.target.value));
  fontFamily && (fontFamily.onchange = e => exec("fontName", e.target.value));
});

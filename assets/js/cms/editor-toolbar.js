/***************************************************
 * TOOLBAR – PART 3
 * Basic rich text controls
 ***************************************************/

export function initToolbar() {
  const bar = document.createElement("div");
  bar.id = "editorToolbar";
  bar.innerHTML = `
    <button data-cmd="bold"><b>B</b></button>
    <input type="color" data-cmd="foreColor">
    <select data-cmd="fontName">
      <option value="Poppins">Poppins</option>
      <option value="Roboto">Roboto</option>
      <option value="Inter">Inter</option>
      <option value="Lato">Lato</option>
      <option value="Noto Sans Telugu">Noto Sans Telugu</option>
      <option value="Mandali">Mandali</option>
    </select>
    <button id="saveText">Save</button>
  `;

  document.body.appendChild(bar);

  bar.addEventListener("click", (e) => {
    const cmd = e.target.dataset.cmd;
    if (!cmd) return;
    document.execCommand(cmd, false, e.target.value || null);
  });

  bar.querySelector("#saveText").onclick = () => {
    document.dispatchEvent(new Event("cms-save"));
  };
}

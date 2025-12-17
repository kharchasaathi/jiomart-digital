
export function renderPage() {
  console.log("🧩 renderPage() called");

  const root = document.getElementById("pageRoot");
  if (!root) return;

  const state = getState();
  if (!state.page) return;

  // clear ONLY first time
  if (!root.dataset.rendered) {
    root.innerHTML = "";
    root.dataset.rendered = "true";
  }

  renderBlocks(root);
}

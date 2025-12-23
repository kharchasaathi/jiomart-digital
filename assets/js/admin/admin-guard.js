import { getState } from "../core/state.js";

document.addEventListener("DOMContentLoaded", () => {
  const state = getState();

  if (!state.adminMode) {
    alert("Unauthorized access");
    window.location.href = "index.html";
  }
});

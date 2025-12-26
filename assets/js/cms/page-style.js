/***************************************************
 * PAGE STYLE – APPLY (BACKGROUND, THEMES READY)
 ***************************************************/
import { getState } from "../core/state.js";

export function applyPageStyles() {
  const state = getState();
  const style = state.page?.style;

  if (!style) return;

  /* PAGE BACKGROUND */
  document.body.style.backgroundColor =
    style.backgroundColor || "";
}

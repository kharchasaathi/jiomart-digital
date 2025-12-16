import { db } from "../core/firebase.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const pageRoot = document.getElementById("pageRoot");
const pageRef = doc(db, "pages", "home");

/* ===============================
   DEFAULT BLOCKS (FIRST TIME)
================================ */
const defaultBlocks = [
  { id: "hero", type: "text", content: "<h2>Welcome to JioMart Digital</h2>" },
  { id: "info", type: "text", content: "<p>Edit this text from admin mode.</p>" }
];

/* ===============================
   LOAD BLOCKS
================================ */
export async function loadBlocks() {
  const snap = await getDoc(pageRef);

  let blocks = [];

  if (snap.exists()) {
    blocks = snap.data().blocks || [];
  } else {
    await setDoc(pageRef, { blocks: defaultBlocks });
    blocks = defaultBlocks;
  }

  renderBlocks(blocks);
}

/* ===============================
   RENDER BLOCKS
================================ */
function renderBlocks(blocks) {
  pageRoot.innerHTML = "";

  blocks.forEach((block) => {
    const div = document.createElement("div");
    div.className = "block";

    if (block.type === "text") {
      div.classList.add("block-text");
      div.innerHTML = block.content;
    }

    /* Admin controls */
    if (document.body.classList.contains("admin-mode")) {
      const controls = document.createElement("div");
      controls.className = "block-controls";

      controls.innerHTML = `
        <button data-action="edit">✏️</button>
      `;

      div.appendChild(controls);
    }

    pageRoot.appendChild(div);
  });
}

/* INIT */
loadBlocks();

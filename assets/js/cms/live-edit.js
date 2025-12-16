import { db } from "../core/firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const pageRef = doc(db, "pages", "home");

let activeBlock = null;

/* Enable editing */
document.addEventListener("click", (e) => {
  if (!document.body.classList.contains("admin-mode")) return;

  const block = e.target.closest(".block");
  if (!block) return;

  if (activeBlock) activeBlock.removeAttribute("contenteditable");

  activeBlock = block;
  block.setAttribute("contenteditable", "true");
  block.focus();
});

/* Save on blur */
document.addEventListener("focusout", async () => {
  if (!activeBlock) return;

  const blocks = [...document.querySelectorAll(".block")].map((b) => ({
    type: "text",
    content: b.innerHTML
  }));

  await setDoc(pageRef, { blocks }, { merge: true });
});

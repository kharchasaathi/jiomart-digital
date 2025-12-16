/***************************************************
 * SITE JS – PUBLIC + CMS RENDER (PART–1 + PART–2)
 ***************************************************/

/* ===============================
   FIREBASE + PRODUCTS
================================ */
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ===============================
   CMS CORE
================================ */
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";
import { setAdminMode } from "../cms/state.js";
import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* ===============================
   CMS INIT (SINGLE ENTRY)
================================ */

async function initCMS() {
  await loadPage("home");
  renderPage();
}

initCMS();

/* Detect admin login */
onAuthStateChanged(auth, (user) => {
  setAdminMode(!!user);
});

/* ===============================
   PRODUCTS GRID (PUBLIC)
   (temporary – will become block later)
================================ */

const grid = document.getElementById("productsGrid");

async function loadProducts() {
  if (!grid) return;

  grid.innerHTML = "";

  const snap = await getDocs(collection(db, "products"));

  snap.forEach((docSnap) => {
    const p = docSnap.data();

    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = p.images?.[0] || "";
    img.loading = "lazy";

    img.onclick = () => openModal(p.images || []);

    card.innerHTML = `
      <h3 class="en-text">${p.name_en || ""}</h3>
      <h3 class="te-text hidden">${p.name_te || ""}</h3>
      <p class="price">₹${p.price || ""}</p>
      <a class="enquire" target="_blank"
        href="https://wa.me/919705379219?text=Interested in ${p.name_en || ""}">
        Enquire
      </a>
    `;

    card.prepend(img);
    grid.appendChild(card);
  });
}

loadProducts();

/* ===============================
   IMAGE MODAL
================================ */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

function openModal(images = []) {
  if (!modal || !modalImg) return;
  modal.classList.remove("hidden");
  modalImg.src = images[0] || "";
}

if (closeModal) {
  closeModal.onclick = () => modal.classList.add("hidden");
}

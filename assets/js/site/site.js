/***************************************************
 * SITE JS – PUBLIC + CMS RENDER (CLEAN)
 ***************************************************/

/* FIREBASE + PRODUCTS */
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* CMS CORE */
import { loadPage } from "../cms/page-store.js";
import { renderPage } from "../cms/render.js";

/* CMS INIT */
async function initCMS() {
  await loadPage("home");
  renderPage();
}

initCMS();

/* PRODUCTS GRID */
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

    card.innerHTML = `
      <h3>${p.name_en || ""}</h3>
      <p class="price">₹${p.price || ""}</p>
    `;

    card.prepend(img);
    grid.appendChild(card);
  });
}

loadProducts();

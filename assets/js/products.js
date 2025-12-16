/***************************************************
 * PRODUCTS – PUBLIC SITE
 ***************************************************/
import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const grid = document.getElementById("productsGrid");

async function loadProducts() {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    grid.innerHTML = "";

    if (snap.empty) {
      grid.innerHTML = "<p>No products available</p>";
      return;
    }

    snap.forEach(doc => {
      const p = doc.data();

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image || ''}" alt="">
        <h3>${p.name || ''}</h3>
        <p>₹${p.price || ''}</p>
      `;
      grid.appendChild(card);
    });

  } catch (err) {
    console.error("Products Load Error:", err);
    grid.innerHTML = "<p>Error loading products</p>";
  }
}

loadProducts();

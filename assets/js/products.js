/***************************************************
 * PUBLIC SITE – PRODUCTS RENDER
 ***************************************************/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } 
  from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
  authDomain: "jiomart-digital.firebaseapp.com",
  projectId: "jiomart-digital",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const grid = document.getElementById("productsGrid");

onSnapshot(collection(db, "products"), (snap) => {
  grid.innerHTML = "";

  if (snap.empty) {
    grid.innerHTML = "<p>No products available</p>";
    return;
  }

  snap.forEach(doc => {
    const p = doc.data();

    const card = document.createElement("div");
    card.className = "product-card";

    const img = p.images?.[0] || "";

    card.innerHTML = `
      <img src="${img}" alt="${p.name_en}">
      <h3 class="en-text">${p.name_en}</h3>
      <p class="te-text">${p.name_te}</p>
      <p class="price">₹${p.price}</p>
      <a class="enquire" href="https://wa.me/919705379219?text=Interested in ${p.name_en}" target="_blank">
        Enquire
      </a>
    `;

    grid.appendChild(card);
  });
});

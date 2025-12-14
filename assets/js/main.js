// Firebase SDKs (MODULE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
  authDomain: "jiomart-digital.firebaseapp.com",
  projectId: "jiomart-digital",
  storageBucket: "jiomart-digital.appspot.com",
  messagingSenderId: "703694544124",
  appId: "1:703694544124:web:3d51ddb7fe3182c51e4b79"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 JioMart Digital – Firebase Connected");

// Load products
async function loadProducts() {
  const grid = document.getElementById("productsGrid");

  if (!grid) {
    console.error("productsGrid not found");
    return;
  }

  grid.innerHTML = "<p>Loading products...</p>";

  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    grid.innerHTML = "";

    if (snapshot.empty) {
      grid.innerHTML = "<p>No products found</p>";
      return;
    }

    snapshot.forEach(doc => {
      const p = doc.data();

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${p.images?.[0] || 'https://via.placeholder.com/300'}">
        <h3>${p.name_en}</h3>
        <p>₹ ${p.price}</p>

        <a class="btn whatsapp"
           href="https://wa.me/91XXXXXXXXXX?text=Interested in ${encodeURIComponent(p.name_en)}"
           target="_blank">
           WhatsApp Enquiry
        </a>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    grid.innerHTML = "<p>Error loading products</p>";
  }
}

loadProducts();

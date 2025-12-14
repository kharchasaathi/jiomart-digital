// Firebase SDKs
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

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 JioMart Digital – Firebase Connected");

// Load products
async function loadProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      grid.innerHTML = "<p>No products found</p>";
      return;
    }

    snapshot.forEach(doc => {
      const p = doc.data();

      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = (p.images && p.images[0]) || "https://dummyimage.com/400x400/cccccc/000000&text=No+Image";

      const title = document.createElement("h3");
      title.innerText = p.name_en || "Unnamed Product";

      const price = document.createElement("p");
      price.innerText = "₹" + (p.price || "--");

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);

      grid.appendChild(card);
    });

  } catch (err) {
    console.error("❌ Error loading products:", err);
    grid.innerHTML = "<p>Error loading products</p>";
  }
}

// Run
loadProducts();

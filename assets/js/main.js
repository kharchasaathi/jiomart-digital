// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
  authDomain: "jiomart-digital.firebaseapp.com",
  projectId: "jiomart-digital",
  storageBucket: "jiomart-digital.firebasestorage.app",
  messagingSenderId: "703694544124",
  appId: "1:703694544124:web:3d51ddb7fe3182c51e4b79"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("🔥 JioMart Digital - Firebase Connected");

// DOM
const productsGrid = document.getElementById("productsGrid");

// Safety check
if (!productsGrid) {
  console.error("❌ productsGrid element not found");
} else {

  db.collection("products")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      productsGrid.innerHTML = "";

      if (snapshot.empty) {
        productsGrid.innerHTML = "<p>No products added yet.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const p = doc.data();

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${p.images?.[0] || 'https://via.placeholder.com/300'}" alt="${p.name_en}">
          <h3>${p.name_en}</h3>
          <p>₹ ${p.price}</p>

          <a class="btn whatsapp"
             href="https://wa.me/91XXXXXXXXXX?text=I am interested in ${encodeURIComponent(p.name_en)}"
             target="_blank">
             Enquire on WhatsApp
          </a>
        `;

        productsGrid.appendChild(card);
      });
    },
    error => {
      console.error("🔥 Firestore error:", error);
      productsGrid.innerHTML = "<p>Error loading products</p>";
    });
}

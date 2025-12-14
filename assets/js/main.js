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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("🔥 JioMart Digital – Firebase Connected");

// Load products
const productsDiv = document.getElementById("products");

db.collection("products")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    productsDiv.innerHTML = "";

    if (snapshot.empty) {
      productsDiv.innerHTML = "<p>No products added yet.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const p = doc.data();

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="category">${p.category}</p>
        <p class="price">₹ ${p.price}</p>

        <a class="btn small whatsapp"
          href="https://wa.me/91XXXXXXXXXX?text=I am interested in ${encodeURIComponent(p.name)}"
          target="_blank">
          Enquire on WhatsApp
        </a>
      `;

      productsDiv.appendChild(card);
    });
  });

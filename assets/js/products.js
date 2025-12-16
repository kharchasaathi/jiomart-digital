import { db } from "./firebase.js";
import { uploadToCloudinary } from "./media-cloudinary.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* DOM */
const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");
const imageInput = document.getElementById("productImages");

/* ================================
   ADD PRODUCT
================================ */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(productForm);

  const product = {
    name_en: formData.get("name_en"),
    name_te: formData.get("name_te"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    images: [],
    createdAt: Date.now()
  };

  try {
    // 🔥 Upload multiple images
    for (const file of imageInput.files) {
      const url = await uploadToCloudinary(file);
      product.images.push(url);
    }

    // Save to Firestore
    await addDoc(collection(db, "products"), product);

    alert("Product added successfully");
    productForm.reset();
    loadProducts();

  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }
});

/* ================================
   LOAD PRODUCTS (ADMIN LIST)
================================ */
async function loadProducts() {
  productsList.innerHTML = "";

  const snap = await getDocs(collection(db, "products"));

  snap.forEach((docSnap) => {
    const p = docSnap.data();

    const div = document.createElement("div");
    div.className = "admin-product";

    div.innerHTML = `
      <strong>${p.name_en}</strong><br>
      ₹${p.price}<br>
      Images: ${p.images.length}
      <br>
      <button data-id="${docSnap.id}">Delete</button>
    `;

    div.querySelector("button").onclick = async () => {
      await deleteDoc(doc(db, "products", docSnap.id));
      loadProducts();
    };

    productsList.appendChild(div);
  });
}

loadProducts();

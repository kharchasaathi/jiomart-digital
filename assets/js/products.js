
/***************************************************
 * ADMIN PRODUCTS MANAGER – PART 4
 * Features:
 *  - Add / Edit / Delete products
 *  - English + Telugu
 *  - Category dropdown
 *  - Multiple HQ image upload
 *  - Firebase Storage integration
 ***************************************************/

import { db, storage } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/* DOM */
const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");
const imageInput = document.getElementById("productImages");

/* Collection */
const productsRef = collection(db, "products");

/* Load Products */
async function loadProducts() {
  productsList.innerHTML = "Loading...";
  const snap = await getDocs(productsRef);
  productsList.innerHTML = "";

  snap.forEach(d => {
    const p = d.data();

    const div = document.createElement("div");
    div.className = "admin-product";

    div.innerHTML = `
      <strong>${p.name_en}</strong><br>
      ₹${p.price}<br>
      <button data-id="${d.id}" class="deleteBtn">Delete</button>
    `;

    productsList.appendChild(div);
  });
}

/* Upload images */
async function uploadImages(files) {
  const urls = [];

  for (const file of files) {
    const imgRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    urls.push(url);
  }
  return urls;
}

/* Add Product */
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name_en = productForm.name_en.value;
  const name_te = productForm.name_te.value;
  const category = productForm.category.value;
  const price = Number(productForm.price.value);
  const files = imageInput.files;

  let images = [];
  if (files.length > 0) {
    images = await uploadImages(files);
  }

  await addDoc(productsRef, {
    name_en,
    name_te,
    category,
    price,
    images,
    available: true,
    createdAt: serverTimestamp()
  });

  productForm.reset();
  loadProducts();
});

/* Delete product */
productsList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.dataset.id;
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  }
});

/* Init */
loadProducts();

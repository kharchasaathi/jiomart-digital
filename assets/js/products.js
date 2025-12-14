// assets/js/products.js
// =======================
// Product Data Structure
// =======================

import { db } from "./firebase.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Add product
export function addProduct(product) {
  const productRef = push(ref(db, "products"));
  return set(productRef, product);
}

// Read products
export function getProducts(callback) {
  const productsRef = ref(db, "products");
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

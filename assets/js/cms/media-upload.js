/***************************************************
 * MEDIA UPLOAD – IMAGE (PHASE-1)
 * ✔ Firebase Storage (CDN)
 * ✔ Uses shared app from core/firebase.js
 * ✔ SAFE for browser (no Node imports)
 ***************************************************/

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { app } from "../core/firebase.js";

/* ===============================
   INIT STORAGE
================================ */
const storage = getStorage(app);

/* ===============================
   IMAGE UPLOAD
================================ */
export async function uploadImage(file) {
  try {
    if (!file) return null;

    const safeName = file.name.replace(/\s+/g, "_");
    const fileName = `${Date.now()}-${safeName}`;

    const imageRef = ref(
      storage,
      `cms/images/${fileName}`
    );

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    return url;
  } catch (err) {
    console.error("❌ Image upload failed", err);
    return null;
  }
}

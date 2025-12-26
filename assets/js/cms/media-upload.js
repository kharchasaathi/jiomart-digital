/***************************************************
 * MEDIA UPLOAD – IMAGE + VIDEO (PHASE-1)
 * ✔ Firebase Storage (CDN)
 * ✔ Uses shared app from core/firebase.js
 * ✔ SAFE for browser (no Node imports)
 * ✔ Error handled (no silent failures)
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

/* ===============================
   VIDEO UPLOAD (PHASE-1)
================================ */
export async function uploadVideo(file) {
  try {
    if (!file) return null;

    const safeName = file.name.replace(/\s+/g, "_");
    const fileName = `${Date.now()}-${safeName}`;

    const videoRef = ref(
      storage,
      `cms/videos/${fileName}`
    );

    await uploadBytes(videoRef, file);
    const url = await getDownloadURL(videoRef);

    return url;
  } catch (err) {
    console.error("❌ Video upload failed", err);
    return null;
  }
}

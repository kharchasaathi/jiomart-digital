/***************************************************
 * ADMIN MEDIA – PRODUCT IMAGE UPLOAD (FIXED)
 ***************************************************/

/* 🔥 FIXED IMPORT PATH */
import { uploadToCloudinary } from "../cms/media-cloudinary.js";
import { getState } from "../core/state.js";

/* ===============================
   DOM ELEMENTS
================================ */
const imageInput = document.getElementById("productImages");
const preview = document.getElementById("imagePreview");

/* ===============================
   IMAGE UPLOAD HANDLER
================================ */
if (imageInput && preview) {
  imageInput.addEventListener("change", async () => {
    preview.innerHTML = "";

    const state = getState();

    /* 🔥 Ensure product draft exists */
    if (!state.currentProduct) {
      state.currentProduct = { images: [] };
    }

    for (const file of imageInput.files) {
      const thumb = document.createElement("div");
      thumb.textContent = "Uploading...";
      thumb.style.fontSize = "12px";
      preview.appendChild(thumb);

      try {
        /* 🔥 Upload to Cloudinary */
        const url = await uploadToCloudinary(file);

        /* 🔥 Preview image */
        const img = document.createElement("img");
        img.src = url;
        img.style.width = "80px";
        img.style.height = "80px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";
        img.style.border = "1px solid #ccc";

        thumb.innerHTML = "";
        thumb.appendChild(img);

        /* 🔥 Attach image to product draft */
        state.currentProduct.images.push(url);

        console.log("📸 Image uploaded:", url);

      } catch (err) {
        thumb.textContent = "❌ Upload failed";
        console.error("Image upload error:", err);
      }
    }
  });
}

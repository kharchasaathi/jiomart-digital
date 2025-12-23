import { uploadToCloudinary } from "../utils/cloudinary.js";
import { getState } from "../core/state.js";

const imageInput = document.getElementById("productImages");
const preview = document.getElementById("imagePreview");

if (imageInput) {
  imageInput.addEventListener("change", async () => {
    preview.innerHTML = "";

    const state = getState();
    state.currentProduct ||= { images: [] };

    for (const file of imageInput.files) {
      const thumb = document.createElement("div");
      thumb.textContent = "Uploading...";
      preview.appendChild(thumb);

      try {
        const url = await uploadToCloudinary(file);

        const img = document.createElement("img");
        img.src = url;
        img.style.width = "80px";
        img.style.height = "80px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";

        thumb.innerHTML = "";
        thumb.appendChild(img);

        // 🔥 attach to product draft
        state.currentProduct.images.push(url);

      } catch (err) {
        thumb.textContent = "Upload failed";
        console.error(err);
      }
    }
  });
}

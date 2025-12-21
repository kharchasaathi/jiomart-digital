/***************************************************
 * CLOUDINARY UPLOAD HELPER – FINAL STABLE
 * Used for:
 * - Product images
 * - Image blocks
 * - Banners / posters (future)
 ***************************************************/

/* ===============================
   CLOUDINARY CONFIG
================================ */
const CLOUD_NAME = "dflbswpw1";     // ✅ Your Cloudinary cloud name
const UPLOAD_PRESET = "jiomart_public"; 
// ⚠️ This must be an UNSIGNED upload preset
// ⚠️ Create it in Cloudinary dashboard

/* ===============================
   UPLOAD FUNCTION
================================ */
export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload request failed");
  }

  const data = await res.json();

  if (!data.secure_url) {
    console.error("Cloudinary response:", data);
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
}

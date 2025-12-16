/***************************************************
 * CLOUDINARY UPLOAD HELPER
 ***************************************************/
const CLOUD_NAME = "dflbswpw1"; // ✅ your cloud name
const UPLOAD_PRESET = "jiomart_public";

export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
}

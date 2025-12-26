import { getStorage, ref, uploadBytes, getDownloadURL } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { app } from "../core/firebase.js";

const storage = getStorage(app);

/* ===============================
   IMAGE UPLOAD
================================ */
export async function uploadImage(file) {
  if (!file) return null;

  const fileName =
    Date.now() + "-" + file.name.replace(/\s+/g, "_");

  const imageRef = ref(
    storage,
    `cms/images/${fileName}`
  );

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
}

/***************************************************
 * ADMIN PAGE BUILDER – PART 6
 * Controls:
 *  - Banner image upload
 *  - Editable texts
 *  - Section ON/OFF
 ***************************************************/

import { db, storage } from "./firebase.js";
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const settingsRef = doc(db, "settings", "page");

/* DOM */
const bannerInput = document.getElementById("bannerImage");
const siteTitleEn = document.getElementById("siteTitleEn");
const siteTitleTe = document.getElementById("siteTitleTe");
const toggleProducts = document.getElementById("toggleProducts");
const toggleContact = document.getElementById("toggleContact");
const saveBtn = document.getElementById("savePage");

/* Load settings */
async function loadPageSettings() {
  const snap = await getDoc(settingsRef);
  if (!snap.exists()) return;

  const d = snap.data();
  siteTitleEn.value = d.title_en || "";
  siteTitleTe.value = d.title_te || "";
  toggleProducts.checked = d.showProducts !== false;
  toggleContact.checked = d.showContact !== false;
}
loadPageSettings();

/* Upload banner */
async function uploadBanner(file) {
  const bannerRef = ref(storage, `site/banner.jpg`);
  await uploadBytes(bannerRef, file);
  return await getDownloadURL(bannerRef);
}

/* Save page settings */
saveBtn.addEventListener("click", async () => {
  let bannerUrl = null;

  if (bannerInput.files.length > 0) {
    bannerUrl = await uploadBanner(bannerInput.files[0]);
  }

  await setDoc(settingsRef, {
    title_en: siteTitleEn.value,
    title_te: siteTitleTe.value,
    showProducts: toggleProducts.checked,
    showContact: toggleContact.checked,
    banner: bannerUrl || null,
    updatedAt: Date.now()
  }, { merge: true });

  alert("Page settings saved");
});

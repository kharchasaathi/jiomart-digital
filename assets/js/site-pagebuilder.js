/***************************************************
 * PUBLIC SITE PAGE BUILDER – PART 6
 ***************************************************/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByQBpGmHivJhXDqgB-JLpIHUYRr1ZGM7Q",
  authDomain: "jiomart-digital.firebaseapp.com",
  projectId: "jiomart-digital",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const refPage = doc(db, "settings", "page");

const header = document.querySelector(".header");
const titleEn = document.querySelector(".header h1.en-text");
const titleTe = document.querySelector(".header .te-text");
const productsSection = document.querySelector(".products-section") || document.querySelector(".card");
const contactSection = document.querySelector(".contact");

onSnapshot(refPage, (snap) => {
  if (!snap.exists()) return;
  const d = snap.data();

  if (d.banner) {
    header.style.backgroundImage = `url(${d.banner})`;
    header.style.backgroundSize = "cover";
    header.style.backgroundPosition = "center";
  }

  if (d.title_en) titleEn.textContent = d.title_en;
  if (d.title_te) titleTe.textContent = d.title_te;

  if (productsSection) {
    productsSection.style.display = d.showProducts === false ? "none" : "block";
  }
  if (contactSection) {
    contactSection.style.display = d.showContact === false ? "none" : "block";
  }
});

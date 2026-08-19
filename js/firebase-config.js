// CM BIZODIT Firebase configuration
// Firebase Web API keys are safe to include in client-side code.
// Your Firestore Security Rules and Firebase Authentication protect the data.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export const firebaseConfig = {
      apiKey: "AIzaSyCXyKSTlmlzkYnH2LW408cVVWV1CPvlfBo",
  authDomain: "cmfilings-6a37c.firebaseapp.com",
  projectId: "cmfilings-6a37c",
  storageBucket: "cmfilings-6a37c.firebasestorage.app",
  messagingSenderId: "138705123778",
  appId: "1:138705123778:web:9561bff9f0f5d89bb6fe5b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb4ItRR69l9OW5D7CREsZTZBfQ8aZvC2o",
  authDomain: "theleadpartner.firebaseapp.com",
  projectId: "theleadpartner",
  storageBucket: "theleadpartner.firebasestorage.app",
  messagingSenderId: "520413490522",
  appId: "1:520413490522:web:6514402c684b9280b85763",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

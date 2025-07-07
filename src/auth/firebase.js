// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-rise-news-app.firebaseapp.com",
  projectId: "the-rise-news-app",
  storageBucket: "the-rise-news-app.firebasestorage.app",
  // storageBucket: "the-rise-news-app.appspot.com", // ✅

  messagingSenderId: "124244892416",
  appId: "1:124244892416:web:9da95d9bfe63aca2b6b1e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// console.log("TEST ENV:", import.meta.env.VITE_FIREBASE_API_KEY);

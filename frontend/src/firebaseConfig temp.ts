// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQkTINT3F-UqqznYPNhfZsq4RivnUmY_g",
  authDomain: "device-streaming-5d483a13.firebaseapp.com",
  projectId: "device-streaming-5d483a13",
  storageBucket: "device-streaming-5d483a13.firebasestorage.app",
  messagingSenderId: "111769413817",
  appId: "1:111769413817:web:c0c19ef4dfe6f941cb9368"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

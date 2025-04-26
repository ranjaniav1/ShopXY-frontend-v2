import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPfDmd8OQXQOVxKUA3snWuTZDsIpEgvR0",
    authDomain: "shopxy-1f265.firebaseapp.com",
    projectId: "shopxy-1f265",
    storageBucket: "shopxy-1f265.firebasestorage.app",
    messagingSenderId: "165631387480",
    appId: "1:165631387480:web:9a392ee5f9d621747aa72d",
    measurementId: "G-CGEVMZLSME"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
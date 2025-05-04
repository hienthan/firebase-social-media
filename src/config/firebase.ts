// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyB5KJ0jAAC21qwZfzCtDtI0Cz8dSuA_d3c",
  authDomain: "social-media-82989.firebaseapp.com",
  projectId: "social-media-82989",
  storageBucket: "social-media-82989.firebasestorage.app",
  messagingSenderId: "635414576800",
  appId: "1:635414576800:web:4c4e53b056551b909093c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

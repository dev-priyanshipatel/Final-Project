// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbETxbVMJe1FIL1NG3d5liTLgSrtF7cmA",
  authDomain: "fir-basic-project-2bda7.firebaseapp.com",
  projectId: "fir-basic-project-2bda7",
  storageBucket: "fir-basic-project-2bda7.firebasestorage.app",
  messagingSenderId: "244927764639",
  appId: "1:244927764639:web:82d85f22cb2cc874d0aaaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

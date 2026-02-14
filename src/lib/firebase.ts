// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA74R1Uy6WSEbmmd1NH1dAr69kTqGd9ILg",
  authDomain: "mohamed-c2016.firebaseapp.com",
  projectId: "mohamed-c2016",
  storageBucket: "mohamed-c2016.firebasestorage.app",
  messagingSenderId: "528411872641",
  appId: "1:528411872641:web:d6a4ea2aea4e43dab5ac80",
  measurementId: "G-NH30603L01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
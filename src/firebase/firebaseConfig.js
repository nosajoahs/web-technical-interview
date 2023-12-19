import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCThUlGWTEir7dMkaHE70KMxyzr9UOi6H0",
  authDomain: "revive-wti.firebaseapp.com",
  projectId: "revive-wti",
  storageBucket: "revive-wti.appspot.com",
  messagingSenderId: "206991576055",
  appId: "1:206991576055:web:5cdf9e6ab655fda4c2fcf2",
  measurementId: "G-2Q7PC28C2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs92wU6O5e-1OxacUBg5NnDBx7eaB41wI",
  authDomain: "test-1-8492c.firebaseapp.com",
  projectId: "test-1-8492c",
  storageBucket: "test-1-8492c.firebasestorage.app",
  messagingSenderId: "158263081412",
  appId: "1:158263081412:web:ca24d3ad0e33069dce8c91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

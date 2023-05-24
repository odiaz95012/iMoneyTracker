import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXT4N8CeTaVQH86dj_Tf-aC1ZIi0Npyxw",
  authDomain: "financetracker-3da48.firebaseapp.com",
  projectId: "financetracker-3da48",
  storageBucket: "financetracker-3da48.appspot.com",
  messagingSenderId: "883430361622",
  appId: "1:883430361622:web:87d1c8863db491a60d4337",
  measurementId: "G-FLLZ533123"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
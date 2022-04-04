import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFZA4vyiY7AHLDq2Rj_08C2UQRFJVfG10",
  authDomain: "finhelp-a4d57.firebaseapp.com",
  projectId: "finhelp-a4d57",
  storageBucket: "finhelp-a4d57.appspot.com",
  messagingSenderId: "989446958977",
  appId: "1:989446958977:web:9d160c9fbd5f81525e4280",
  measurementId: "G-LKN60C2DQK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();

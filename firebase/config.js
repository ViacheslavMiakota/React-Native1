import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdNkQzsO-rrbP9MjYWj68Bwcj1qeeh8DM",
  authDomain: "rn-project-7cea3.firebaseapp.com",
  projectId: "rn-project-7cea3",
  storageBucket: "rn-project-7cea3.appspot.com",
  messagingSenderId: "356708034565",
  appId: "1:356708034565:web:6ea23eeede1e770a58546c",
  measurementId: "G-3PGD2M1VLE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default db;

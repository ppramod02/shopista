
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "comments-a32de",
  storageBucket: "comments-a32de.appspot.com",
  messagingSenderId: "87202492339",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-FS1S9P2BW2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
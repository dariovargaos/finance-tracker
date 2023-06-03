import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";

const firebaseConfig: object = {
  apiKey: "AIzaSyDWqdlNIQu5bz5W4nw3XEod_ngug_7Syg4",
  authDomain: "financetrackerts.firebaseapp.com",
  projectId: "financetrackerts",
  storageBucket: "financetrackerts.appspot.com",
  messagingSenderId: "504122819622",
  appId: "1:504122819622:web:5279c54255afd96ee9d2e7",
};

//init firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

//init firestore db
const db: Firestore = getFirestore();

//init firebase auth
const auth: Auth = getAuth();

export { db, auth };

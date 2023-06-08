import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, Timestamp } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

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
const db: Firestore = getFirestore(app);

//init firebase auth
const auth: Auth = getAuth(app);

//init timestamp
const timestamp = Timestamp;

export { db, auth, timestamp };

import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, Timestamp } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig: object = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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

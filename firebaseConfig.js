import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoOSvw-WfD93J_qPoIp9PJSvL5jsK7JGc",
  authDomain: "whastapp-02.firebaseapp.com",
  projectId: "whastapp-02",
  storageBucket: "whastapp-02.appspot.com",
  messagingSenderId: "335447478987",
  appId: "1:335447478987:web:c1da1fb81cdc4814c0814e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider, collection, getDocs, setDoc };

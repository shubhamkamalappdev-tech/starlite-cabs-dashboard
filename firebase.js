import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdNfvN-z70PdlwkhW-BXbrZyRGhlIPEoU",
  authDomain: "starlite-cabs-681b6.firebaseapp.com",
  projectId: "starlite-cabs-681b6",
  storageBucket: "starlite-cabs-681b6.firebasestorage.app",
  messagingSenderId: "70208487697",
  appId: "1:70208487697:web:201c8ebe574213edbf0cb0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

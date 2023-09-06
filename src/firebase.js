import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAeW5ruObugjN_fRb4STtOv6yObJLYAxHI",
  authDomain: "react-2022-7a846.firebaseapp.com",
  projectId: "react-2022-7a846",
  storageBucket: "react-2022-7a846.appspot.com",
  messagingSenderId: "326381045829",
  appId: "1:326381045829:web:f77791defcae68e123bb2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

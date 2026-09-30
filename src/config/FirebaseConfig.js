// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Optional (for login/logout)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyA4QaEGB9dUWgZbsQL0v1P27jat0_YrQ8I",
 authDomain: "swordnex-sites.firebaseapp.com",
 projectId: "swordnex-sites",
 storageBucket: "swordnex-sites.firebasestorage.app",
 messagingSenderId: "14988485795",
 appId: "1:14988485795:web:35988612ce2c0c78778b16",
 measurementId: "G-4S3BFZK3LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export everything correctly (no duplicates)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
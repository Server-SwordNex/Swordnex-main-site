import {
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signOut,
 onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/FirebaseConfig";

/**
 * Signs up a new user and stores their role in Firestore.
 */
export const signUpUser = async ({ email, password, firstName, lastName, role, mobileNumber }) => {
 try {
 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 const user = userCredential.user;

 // Store additional user info in Firestore
 await setDoc(doc(db, "users", user.uid), {
 firstName,
 lastName,
 email,
 role,
 mobileNumber,
 createdAt: new Date().toISOString(),
 });

 return { user, error: null };
 } catch (error) {
 return { user: null, error: error.message };
 }
};

/**
 * Signs in an existing user.
 */
export const signInUser = async (email, password) => {
 try {
 const userCredential = await signInWithEmailAndPassword(auth, email, password);
 return { user: userCredential.user, error: null };
 } catch (error) {
 return { user: null, error: error.message };
 }
};

/**
 * Signs out the current user.
 */
export const signOutUser = async () => {
 try {
 await signOut(auth);
 return { error: null };
 } catch (error) {
 return { error: error.message };
 }
};

/**
 * Fetches user data (including role) from Firestore.
 */
export const getUserData = async (uid) => {
 try {
 const docRef = doc(db, "users", uid);
 const docSnap = await getDoc(docRef);

 if (docSnap.exists()) {
 return { data: docSnap.data(), error: null };
 } else {
 return { data: null, error: "User data not found" };
 }
 } catch (error) {
 return { data: null, error: error.message };
 }
};

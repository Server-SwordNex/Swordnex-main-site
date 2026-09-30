import {
 signInWithEmailAndPassword,
 signOut,
 } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/FirebaseConfig";

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

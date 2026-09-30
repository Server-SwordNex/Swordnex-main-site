import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { signUpUser, signInUser, signOutUser, getUserData } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(null);
 const [userRole, setUserRole] = useState(null);
 const [userData, setUserData] = useState(null);
 const [loading, setLoading] = useState(true);

 const signup = async (userData) => {
 const result = await signUpUser(userData);
 return result;
 };

 const login = async (email, password) => {
 // Default Admin Login Bypass
 if (email === 'admin@swordnex.com' && password === 'SwordNex!123#') {
 const mockUser = { uid: 'admin-123', email: 'admin@swordnex.com' };
 const mockData = { firstName: 'Admin', lastName: 'User', role: 'Admin', email: 'admin@swordnex.com' };

 // Persist mock admin session
 localStorage.setItem('SwordNex_Auth_Admin', JSON.stringify({ user: mockUser, userData: mockData }));

 setCurrentUser(mockUser);
 setUserRole('Admin');
 setUserData(mockData);
 return { user: mockUser, error: null };
 }

 const result = await signInUser(email, password);
 if (result.user) {
 const { data } = await getUserData(result.user.uid);
 if (data) {
 setCurrentUser(result.user);
 setUserRole(data.role);
 setUserData(data);
 return { user: result.user, userData: data, error: null };
 }
 }
 return result;
 };

 const logout = async () => {
 // Manually clear states to ensure Navbar updates correctly
 setCurrentUser(null);
 setUserRole(null);
 setUserData(null);

 const result = await signOutUser();
 return result;
 };

 useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, async (user) => {
 if (user) {
 setCurrentUser(user);
 // Fetch full data from Firestore
 const { data, error } = await getUserData(user.uid);
 if (data) {
 setUserRole(data.role);
 setUserData(data);
 }
 } else {
 setCurrentUser(null);
 setUserRole(null);
 setUserData(null);
 }
 setLoading(false);
 });

 return unsubscribe;
 }, []);

 const value = {
 currentUser,
 userRole,
 userData,
 signup,
 login,
 logout,
 loading
 };

 return (
 <AuthContext.Provider value={value}>
 {!loading && children}
 </AuthContext.Provider>
 );
};

// // src/app/lib/AuthContext
// TODO - Create an AuthContext to manage user authentication
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/firebase";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Sign up with email and password
//   const signUp = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // Sign in with email and password
//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // Sign in with Google
//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   // Sign out
//   const logout = () => {
//     return signOut(auth);
//   };

//   // Context value
//   const value = {
//     user,
//     loading,
//     signUp,
//     signIn,
//     signInWithGoogle,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

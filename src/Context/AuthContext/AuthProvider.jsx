// AuthProvider.jsx
import React from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init"; // make sure your auth is exported

const googleProvider=new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle=()=>{
    return signInWithPopup(auth,googleProvider);
  }

  const authInfo = {
    registerUser,
    signInUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

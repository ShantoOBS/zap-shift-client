// AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init"; // make sure your auth is exported

const googleProvider=new GoogleAuthProvider();

export default function AuthProvider({ children }) {

   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
     setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
     setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle=()=>{
     setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }

  const logOut=()=>{
     return signOut(auth);
  }

  const updateUser=(userData)=>{
     return updateProfile(auth.currentUser,userData);
  }

  const forgetPassword=(email)=>{
     return sendPasswordResetEmail(auth,email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUser,
    forgetPassword,

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

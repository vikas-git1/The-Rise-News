import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userDetails) => {
      setUser(userDetails);
      if (userDetails) {
        const docRef = doc(db, "users", userDetails.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setUserProfile({});
        }
      } else {
        setUser(null);
        setUserProfile({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

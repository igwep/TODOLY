import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(true); // For userData loading

  useEffect(() => {
    let unsubscribeFirestore = null; // Declare Firestore unsubscribe outside

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        setUserDataLoading(true);
        const userDocRef = doc(db, 'users', currentUser.uid);

        // Start listening to Firestore changes
        unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserData(docSnapshot.data());
            } else {
              console.warn('No user document found');
              setUserData(null);
            }
            setUserDataLoading(false);
          },
          (error) => {
            console.error('Error fetching user data:', error);
            setUserDataLoading(false);
          }
        );
      } else {
        setUserData(null);
        setUserDataLoading(false);
      }
    });

    return () => {
      unsubscribeAuth(); // Clean up auth listener
      if (unsubscribeFirestore) unsubscribeFirestore(); // Clean up Firestore listener
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        userDataLoading, // Expose the userData loading state
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);

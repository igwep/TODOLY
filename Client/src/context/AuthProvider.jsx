// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(true);

  const updateOverdueTasks = async (userData, uid) => {
    try {
      console.log("Starting overdue tasks update...");
      console.log("User ID:", uid);
      
  
      const now = moment();
      console.log("Current time:", now.format("YYYY-MM-DD HH:mm:ss"));
  
      if (!userData.categories) {
        console.warn("No categories found in user data.");
        return userData; // Return unchanged user data
      }
  
      // Iterate through each category and update tasks
      const updatedCategories = Object.entries(userData.categories).reduce(
        (updated, [categoryKey, category]) => {
         
  
          const updatedTasks = category.tasks.map((task) => {
            if (!moment(task.date, "YYYY-MM-DD", true).isValid()) {
              console.warn(`Invalid date format for task ID: ${task.id}. Skipping.`);
              return task;
            }
  
            const dueDate = moment(task.date, "YYYY-MM-DD").add(1, "days"); // Add 1 day to due date
           
  
            // Check if the task is overdue and not finished
            if (
              now.isAfter(dueDate) && // Check if current time is after the adjusted due date
              task.status !== "Finished" // Only update if not "Finished"
            ) {
              
              return { ...task, status: "Failed" };
            }
  
         
            return task;
          });
  
          updated[categoryKey] = {
            ...category,
            tasks: updatedTasks,
          };
  
          return updated;
        },
        {}
      );
  
      // Update the user data with modified categories
      const updatedUserData = {
        ...userData,
        categories: updatedCategories,
      };
  
     
  
      // Save the updated data to Firestore
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, updatedUserData);
      console.log("User data successfully saved to Firestore.");
  
      return updatedUserData;
    } catch (error) {
      console.error("Error updating overdue tasks:", error);
      throw error; // Rethrow the error for further handling
    }
  };
  const updateCompleteTasks = async (userData, uid) => {
    try {
      console.log("Starting removal of completed tasks older than 3 days...");
      const now = moment();
      console.log("Current time:", now.format("YYYY-MM-DD HH:mm:ss"));
  
      if (!userData.categories) {
        console.warn("No categories found in user data.");
        return userData; // Return unchanged user data
      }
  
      // Iterate through each category and remove tasks older than 3 days
      const updatedCategories = Object.entries(userData.categories).reduce(
        (updated, [categoryKey, category]) => {
          const filteredTasks = category.tasks.filter((task) => {
            if (!moment(task.dayFinished, "dddd, MMMM Do YYYY", true).isValid()) {
              console.warn(`Invalid date format for task ID: ${task.id}. Skipping.`);
              return true; // Keep task unchanged
            }
  
            const deleteDate = moment(task.dayFinished, "dddd, MMMM Do YYYY").add(3, "days");
            if (now.isAfter(deleteDate)) {
              console.log(`Removing task ID: ${task.id}, finished on: ${task.dayFinished}`);
              return false; // Exclude task from the list (remove it)
            }
  
            return true; // Keep task if not yet expired
          });
  
          updated[categoryKey] = {
            ...category,
            tasks: filteredTasks,
          };
  
          return updated;
        },
        {}
      );
  
      // Update the user data in Firestore
      const updatedUserData = {
        ...userData,
        categories: updatedCategories,
      };
  
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, updatedUserData);
      console.log("Old tasks successfully removed from Firestore.");
  
      return updatedUserData;
    } catch (error) {
      console.error("Error removing old completed tasks:", error);
      throw error;
    }
  };
  
  
  

  useEffect(() => {
    console.log("Setting up auth state listener...");
    let unsubscribeFirestore = null;
    let isUpdatingTasks = false; // Prevent simultaneous updates
  
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
  
      if (currentUser) {
        setUserDataLoading(true);
        console.log("Fetching user data for UID:", currentUser.uid);
  
        const userDocRef = doc(db, "users", currentUser.uid);
  
        unsubscribeFirestore = onSnapshot(
          userDocRef,
          async (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
  
              // Deep comparison: Check if userData is identical to avoid redundant updates
              const isSameData = JSON.stringify(userData) === JSON.stringify(data);
  
              if (!isSameData) {
                setUserData(data);
  
                // Update tasks only if necessary and not already updating
                if (!isUpdatingTasks && data.categories) {
                  isUpdatingTasks = true;
                  try {
                    console.log("Updating overdue and completed tasks...");
                    const updatedData = await updateOverdueTasks(data, currentUser.uid);
                    await updateCompleteTasks(updatedData, currentUser.uid);
                  } catch (error) {
                    console.error("Error updating tasks:", error);
                  } finally {
                    isUpdatingTasks = false;
                  }
                }
              }
            } else {
              console.warn("No user document found.");
              setUserData(null);
            }
  
            setUserDataLoading(false);
          },
          (error) => {
            console.error("Error fetching user data:", error);
            setUserDataLoading(false);
          }
        );
      } else {
        console.log("No user signed in. Clearing user data.");
        setUserData(null);
        setUserDataLoading(false);
      }
    });
  
    return () => {
      console.log("Cleaning up listeners...");
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [userData]);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        userDataLoading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  console.log('Using Auth context...');
  return useContext(AuthContext);
};

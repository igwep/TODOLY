import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(true); // For userData loading

  const updateOverdueTasks = async (tasks, uid) => {
    console.log('Starting overdue tasks update...');
    console.log('User ID:', uid);
    console.log('Original tasks:', tasks);
  
    const now = moment();
    console.log('Current time:', now.format('YYYY-MM-DD HH:mm:ss'));
  
    const updatedTasks = tasks.map((task) => {
      const dueDate = moment(task.date, 'YYYY-MM-DD');
      console.log(`Task ID: ${task.id}, Due Date: ${dueDate.format('YYYY-MM-DD')}, Status: ${task.status}`);
  
      // Check if the task is overdue and not finished
      if (dueDate.isBefore(now) && task.status !== 'Finished') {
        console.log(`Task ID: ${task.id} is overdue. Marking it as "Failed".`);
        return { ...task, status: 'Failed' };
      }
  
      console.log(`Task ID: ${task.id} is not overdue or already finished.`);
      return task;
    });
  
    // Check if there are any updates to persist
    const tasksChanged = JSON.stringify(tasks) !== JSON.stringify(updatedTasks);
    console.log('Tasks changed:', tasksChanged);
  
    if (tasksChanged) {
      try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { tasks: updatedTasks });
        console.log('Overdue tasks updated successfully in Firestore!');
      } catch (error) {
        console.error('Error updating overdue tasks in Firestore:', error);
      }
    } else {
      console.log('No tasks were updated. Skipping Firestore update.');
    }
  
    console.log('Overdue tasks update process completed.');
  };
  

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
          async (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setUserData(data);

              // Check for overdue tasks
              if (data.tasks) {
                await updateOverdueTasks(data.tasks, currentUser.uid);
              }
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

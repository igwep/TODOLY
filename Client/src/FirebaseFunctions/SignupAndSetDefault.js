import react, {useContext, useState} from 'react';
import { LoadingContext } from '../context/LoadingContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth, db, createUserWithEmailAndPassword } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const SignupAndSetDefaultData = async (email, password, userDetails, setLoading ) =>{

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await sendEmailVerification(user);
                console.log('verification email sent to:', email);
try{
  await setDoc(doc(db, 'users', user.uid),{
    userDetails:{
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userName:userDetails.userName,
            },
            task:[],
            categories: {
                high: {
                  name: "High Priority",
                  tasks: [] // Empty array for tasks under this category
                },
                moderate: {
                  name: "Moderate Priority",
                  tasks: [] // Empty array for tasks under this category
                },
                low: {
                  name: "Low Priority",
                  tasks: [] // Empty array for tasks under this category
                }
              }
        });
        console.log("User signed up and default data added to Firestore");
} catch(error){
  console.error('Error adding data to Firestore', error);
} 
          
                console.log("user signed up and default data added to firestore");
            } catch (error) {
                console.error('Error signing up user and setting default data', error);
            } finally{
              setLoading(false);
              
            }
}
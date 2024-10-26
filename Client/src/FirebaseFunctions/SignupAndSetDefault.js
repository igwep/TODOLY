import { auth, db, createUserWithEmailAndPassword } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const signupAndSetDefaultData = async (email, password, userDetails ) =>{
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid),{
            userDetails:{
                username: userDetails.username,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                userName:userDetails.userName,
                phoneNumber: userDetails.phoneNumber,
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
                console.log("user signed up and default data added to firestore");
            } catch (error) {
                console.error('Error signing up user and setting default data', error);
            }
}
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginUser = async (email, password, navigate) => {
    
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('logged in user:', user);
        navigate('/dashboard');


    } catch(error){
        console.error('login error:', error.message);

    }
}
export const GoogleSignIn = async (navigate) => {
    try{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // check if user exists in the firestore database
    const userRef = doc(db, 'user', user.uid);
    const userDoc = await getDoc(userRef);
    if(!userDoc.exists() || !userDoc.data().userName){
        console.log(userDoc)
        navigate('/dashboard') // this is for popup details
    }
    else{
        navigate('/dashboard')
    }
    }
    catch (error){
        console.error("Google Sign-In Error:", error.message)
    }

}

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginUser = async (email, password, navigate, setLoading) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('logged in user:', user);
        navigate('/Dashboard');

    } catch(error){
        console.error('login error:', error.message);

    }
    finally{
        setLoading(false);
    }
}

export const GoogleSignIn = async (navigate, setLoading) => {
    try
    {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //fetcg the credentials
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const idToken = await user.getIdToken();
    const response = await fetch("http://localhost:5000/verify-google-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
        throw new Error(`Failed to verify token: ${response.statusText}`);
    }
    const data = await response.json();
    // Retrieve user's display name and split into first and last names
    const fullName = user.displayName || '';
    const emailAddress = user.email;
    const profilePicture = user.photoURL
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");

    // check if user exists in the firestore database
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if(!userDoc.exists()){
        await setDoc(userRef, {
            userDetails: {
                firstName: firstName ||"",  // Initialize with empty fields
                lastName: lastName || "",
                userName: "",
                email: emailAddress || "",
                profilePicture:profilePicture
                
            },
            task: [],
            categories: {
                Extreme: { name: "Extreme", tasks: [] },
                Moderate: { name: "Moderate Priority", tasks: [] },
                Low: { name: "Low Priority", tasks: [] }
            }
        });
        navigate('additional-info');
    }
     else if(!userDoc.data().userDetails.userName){
        navigate('/additional-info');
    } 
    
    else {
        navigate('/dashboard');
    }
    

} catch (error){
    console.error("Google Sign-In Error:", error.message);

    
}
finally{
    setLoading(false)
}
};

export const FacebookSignIn = async () => {
    try{
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user
    }
    catch(error){
        console.error('error:', error.message)

    }

} 

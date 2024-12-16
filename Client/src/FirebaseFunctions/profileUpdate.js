import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { notify } from "../utils/Notify";

export const updateProfile = async ({ user, formData }) => {
    const { lastName, firstName, email, userName } = formData || {};
    if (!lastName || !firstName || !email || !userName) {
        throw new Error("Form data is incomplete");
    }

    const userId = user?.uid;
    if (!userId) throw new Error("User not authenticated");
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) throw new Error("User document not found");
    const userDetails = userSnapshot.data()?.userDetails || {};
    const updatedUserDetails = {
        ...userDetails,
        firstName,
        lastName,
        email,
        userName,
    };

    await updateDoc(userRef, { userDetails: updatedUserDetails });
    console.log("User profile updated successfully");
};
/* export const handlePasswordResetOrSet = async (email, setLoading, setShowPasswordUI) => {
    setLoading(true);
    try{
        await sendPasswordResetEmail(auth, email);
        notify("Password reset email sent. Check your inbox.", "success", false);
    } catch(error){
        console.error(error)
    } finally{
        setLoading(false);
    }
} */

    export const handlePasswordResetOrSet = async (email, setLoading, setShowPasswordUI) => {
        setLoading(true);
        try {
            const normalizedEmail = email.trim().toLowerCase();
            console.log("Normalized Email:", normalizedEmail);
    
            const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
            console.log("Methods retrieved:", methods);
    
            if (!methods.length) {
                console.error("No methods found for:", normalizedEmail);
                notify("Email not found. Please check the email or sign up.", "error", false);
            } else if (methods.includes("password")) {
                console.log("Password method exists. Sending reset email...");
                await sendPasswordResetEmail(auth, normalizedEmail);
                notify("Password reset email sent. Check your inbox.", "success", false);
                setShowPasswordUI(false);
            } else if (methods.includes("google.com")) {
                console.log("Google sign-in detected.");
                notify(
                    "This account is signed in through Google. Please change your password in Google account settings.",
                    "info",
                    false
                );
                setShowPasswordUI(false);
            } else {
                console.log("Unhandled method detected:", methods);
                notify("No password method found. Please set one.", "info", false);
                setShowPasswordUI(true);
            }
        } catch (error) {
            console.error("Error in handlePasswordResetOrSet:", error);
            notify("Error resetting password. Try again later.", "error", false);
        } finally {
            setLoading(false);
        }
    };
    
    
    



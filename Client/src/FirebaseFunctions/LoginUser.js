import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    FacebookAuthProvider,
    getRedirectResult 
  } from "firebase/auth";
  import { auth, db } from "../firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  
  // Common function to handle user data and Firestore setup
  const handleUserData = async (user, navigate) => {
    const fullName = user.displayName || "";
    const emailAddress = user.email;
    const profilePicture = user.photoURL || "";
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");
    
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
  
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        userDetails: {
          firstName: firstName || "",
          lastName: lastName || "",
          userName: "",
          email: emailAddress || "",
          profilePicture: profilePicture,
        },
        tasks: [],
        categories: {
          Extreme: { name: "Extreme", tasks: [] },
          Moderate: { name: "Moderate Priority", tasks: [] },
          Low: { name: "Low Priority", tasks: [] },
        },
      });
      navigate("/additional-info");
    } else if (!userDoc.data().userDetails.userName) {
      navigate("/additional-info");
    } else {
      navigate("/dashboard");
    }
  };
  
  // Email/Password Sign-In
  export const LoginUser = async (email, password, navigate, setLoading) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };
 
  
  // Google Sign-In
  export const GoogleSignIn = async (navigate, setLoading) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Result:", result);
      const user = result.user;
      await handleUserData(user, navigate);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Facebook Sign-In
  export const FacebookSignIn = async (navigate, setLoading) => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await handleUserData(user, navigate);
    } catch (error) {
      console.error("Facebook Sign-In Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Sign-In Redirect for Mobile
  export const handleRedirectResult = async (navigate, setLoading) => {
    try {
      setLoading(true);
      const result = await getRedirectResult(auth);
      console.log("Redirect Result:", result);
  
      if (!result) {
        console.log("No redirect result found. Returning to login.");
        navigate("/");
        return;
      }
  
      const user = result.user;
      if (!user) {
        console.log("No user found in redirect result.");
        navigate("/");
        return;
      }
  
      console.log("User retrieved after redirect:", user);
  
      // Process user data and navigate
      await handleUserData(user, navigate);
    } catch (error) {
      console.error("Error in redirect result handling:", error.message);
      navigate("/"); // Navigate to login if there is an error
    } finally {
      setLoading(false);
    }
  };
  
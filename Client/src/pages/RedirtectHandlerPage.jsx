import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../context/UseAuth";

const RedirectHandler = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const user = result.user;
          console.log("Redirected User:", user);
          setUser(user);

          // Handle user data setup
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            await setDoc(userRef, {
              userDetails: {
                firstName: user.displayName?.split(" ")[0] || "",
                lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
                email: user.email || "",
                profilePicture: user.photoURL || "",
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
        } else {
          console.log("No redirect result found.");
          navigate("/"); // Go back to login
        }
      } catch (error) {
        console.error("Error handling redirect:", error.message);
        navigate("/"); // Redirect to login on error
      }
    };

    handleRedirectResult();
  }, [navigate, setUser]);

  return <div>Processing sign-in...</div>;
};

export default RedirectHandler;

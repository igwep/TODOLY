import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const testEmail = "test@example.com";
const testPassword = "testPassword";

export const debugEmail = async () => {
  try {
    // Ensure email exists
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log("User created successfully:", userCredential.user);

    // Fetch sign-in methods
    const methods = await fetchSignInMethodsForEmail(auth, testEmail);
    console.log("Sign-in methods:", methods);
  } catch (error) {
    console.error("Error:", error);
  }
}


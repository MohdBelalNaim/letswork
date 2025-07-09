import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";

export async function saveUser({ fullname, email, password, photoUrl = "" }) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.warn("Duplicate email found in Firestore:", email);
      return { success: false, message: "Email already registered." };
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    const userData = {
      name: fullname,
      email,
      photoUrl,
      bio: "",
      designation: "",
      skills: [],
      college: {
        collegeName: "",
        collegeEmail: "",
      },
      saved: [],
      visited: [],
      applied: [],
      uid: firebaseUser.uid,
    };

    const docRef = await addDoc(usersRef, userData);
    console.log("User saved with ID:", docRef.id);
    return {
      success: true,
      message: "User registered successfully.",
      user: userData,
    };
  } catch (error) {
    console.error("Error saving user:", error);
    let msg = "Error saving user.";
    if (error.code === "auth/email-already-in-use") {
      msg = "Email already registered in Auth.";
    }
    if (error.code === "auth/weak-password") {
      msg = "Password should contain atleats 6 characters";
    }
    return { success: false, message: msg };
  }
}

export async function loginUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "User not found in Firestore." };
    }

    const userData = querySnapshot.docs[0].data();

    return {
      success: true,
      message: "Login successful.",
      user: userData,
    };
  } catch (error) {
    console.error("Login error:", error);
    let msg = "Login failed.";
    if (error.code === "auth/user-not-found") msg = "User not found.";
    if (error.code === "auth/invalid-credential") msg = "Incorrect password.";
    return { success: false, message: msg };
  }
}

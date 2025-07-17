import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";

export async function saveUser({
  fullname,
  email,
  password,
  phone,
  photoUrl = "",
}) {
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
      phone,
      designation: "",
      skills: "",
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

export async function updateUserProfile(data, user) {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const updatePayload = {
      name: data.fullname || "",
      phoneNumber: data.phone || "",
      skills: data.skills || "",
      bio: data.bio || "",
      designation: data.designation || "",
    };

    if (userSnap.exists()) {
      await updateDoc(userRef, updatePayload);
    } else {
      // create the document first
      await setDoc(userRef, updatePayload);
    }

    return {
      success: true,
      user: {
        ...user,
        ...updatePayload,
      },
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

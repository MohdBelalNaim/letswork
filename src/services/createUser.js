import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
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

export async function updateUserProfile(updates, currentUser) {
  try {
    if (!currentUser?.email) {
      throw new Error("No user is logged in.");
    }

    if (!updates || typeof updates !== "object") {
      throw new Error("Invalid updates object provided.");
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", currentUser.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found in Firestore.");
    }

    const userDoc = querySnapshot.docs[0];
    const userDocRef = doc(db, "users", userDoc.id);

    const updatedFields = {};

    if (updates.fullname !== undefined) {
      updatedFields.name = updates.fullname;
    }
    if (updates.phone !== undefined) {
      updatedFields.phoneNumber = updates.phone;
    }
    if (updates.skills !== undefined) {
      updatedFields.skills = updates.skills;
    }
    if (updates.bio !== undefined) {
      updatedFields.bio = updates.bio;
    }
    if (updates.designation !== undefined) {
      updatedFields.designation = updates.designation;
    }

    updatedFields.updatedAt = new Date().toISOString();

    if (Object.keys(updatedFields).length === 1) {
      return {
        success: true,
        user: currentUser,
        message: "No changes to update.",
      };
    }

    await updateDoc(userDocRef, updatedFields);

    const updatedUser = {
      ...currentUser,
      ...updatedFields,
      name: updatedFields.name || currentUser.name,
      phoneNumber: updatedFields.phoneNumber || currentUser.phoneNumber,
      skills: updatedFields.skills || currentUser.skills,
      bio: updatedFields.bio || currentUser.bio,
      designation: updatedFields.designation || currentUser.designation,
    };

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating profile:", error.message);

    if (error.code === "permission-denied") {
      return {
        success: false,
        message:
          "Permission denied. You don't have access to update this profile.",
      };
    } else if (error.code === "not-found") {
      return { success: false, message: "User document not found." };
    } else if (error.code === "unavailable") {
      return {
        success: false,
        message: "Service temporarily unavailable. Please try again.",
      };
    }

    return { success: false, message: error.message };
  }
}

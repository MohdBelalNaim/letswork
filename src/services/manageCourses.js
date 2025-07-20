import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const fetchCourseById = async (id) => {
  try {
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (err) {
    console.error("Error fetching Course:", err);
    throw err;
  }
};
export const fetchSimilarCourses = async (currentCourseId, limit = 2) => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentCourseId) {
        courses.push({ id: doc.id, ...doc.data() });
      }
    });
    return courses.slice(0, limit);
  } catch (err) {
    console.error("Error fetching similar jobs:", err);
    throw err;
  }
};
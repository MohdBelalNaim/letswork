import {
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function saveJob(jobData, userInfo, type = "saved") {
  const colRef = collection(db, "jobsManage");
  const q = query(
    colRef,
    where("job.id", "==", jobData.id),
    where("user.email", "==", userInfo.email),
    where("type", "==", type)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const existingDoc = snapshot.docs[0];
    await deleteDoc(doc(db, "jobsManage", existingDoc.id));
    return "unsaved";
  }
  const payload = {
    job: jobData,
    user: userInfo,
    type,
    createdAt: serverTimestamp(),
  };

  await addDoc(colRef, payload);
  return "saved";
}

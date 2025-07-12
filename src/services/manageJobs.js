import { getFirestore, serverTimestamp ,collection,addDoc,} from "firebase/firestore";
import { auth, db } from "../firebase";
export async function saveJob(jobData,userInfo,type){
  const payload={
    job: jobData,
    user: userInfo,
    type,
    createdAt: serverTimestamp(),
  };
  const colRef = collection(db, "jobsManage");
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}
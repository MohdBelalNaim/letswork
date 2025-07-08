import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

function saveUser(details) {
    const userRef = doc(db, "users", details.uid);
    
}
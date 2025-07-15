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

// Fetch a single job by ID
export const fetchJobById = async (id) => {
  try {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (err) {
    console.error("Error fetching job:", err);
    throw err;
  }
};

// Fetch similar jobs (excluding current job)
export const fetchSimilarJobs = async (currentJobId, limit = 4) => {
  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobs = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentJobId) {
        jobs.push({ id: doc.id, ...doc.data() });
      }
    });
    return jobs.slice(0, limit);
  } catch (err) {
    console.error("Error fetching similar jobs:", err);
    throw err;
  }
};

// Check if a job is saved by the user
export const checkJobSavedStatus = async (jobId, userEmail) => {
  try {
    const q = query(
      collection(db, "jobsManage"),
      where("user.email", "==", userEmail),
      where("type", "==", "Saved"),
      where("job.id", "==", jobId)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return {
        isSaved: true,
        saveDocId: snapshot.docs[0].id,
      };
    }
    return {
      isSaved: false,
      saveDocId: null,
    };
  } catch (err) {
    console.error("Error checking saved status:", err);
    throw err;
  }
};

// Check if a job has been applied to by the user
export const checkJobAppliedStatus = async (jobId, userEmail) => {
  try {
    const q = query(
      collection(db, "jobsManage"),
      where("user.email", "==", userEmail),
      where("type", "==", "Applied"),
      where("job.id", "==", jobId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (err) {
    console.error("Error checking applied status:", err);
    throw err;
  }
};

// Apply for a job
export const applyForJob = async (job, user) => {
  try {
    // Check if already applied
    const q = query(
      collection(db, "jobsManage"),
      where("user.email", "==", user.email),
      where("type", "==", "Applied"),
      where("job.id", "==", job.id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      toast.error("You have already applied for this job.");
      return "already_applied";
    }

    // Save the application
    const result = await saveJob(job, user, "Applied");

    if (result === "applied") {
      toast.success("Application recorded. Opening job link...");
      window.open(job.applyLink, "_blank");
      return "applied";
    } else if (result === "already_applied") {
      toast.error("You have already applied for this job.");
      return "already_applied";
    }
  } catch (err) {
    console.error("Error applying for job:", err);
    toast.error("Error applying: " + err.message);
    throw err;
  }
};

// Toggle save status of a job
export const toggleJobSave = async (job, user, isSaved, saveDocId) => {
  try {
    if (isSaved && saveDocId) {
      // Unsave the job
      await deleteDoc(doc(db, "jobsManage", saveDocId));
      toast.success("Job unsaved");
      return {
        isSaved: false,
        saveDocId: null,
      };
    } else {
      // Save the job
      const result = await saveJob(job, user, "Saved");
      if (result === "saved") {
        toast.success("Job saved");
        return {
          isSaved: true,
          saveDocId: null, // The saveDocId will be updated by checking saved status again
        };
      }
    }
  } catch (err) {
    console.error("Error toggling job save:", err);
    toast.error("Error saving job: " + err.message);
    throw err;
  }
};

// Share a job
export const shareJob = async (job) => {
  const shareData = {
    title: job.title,
    text: `Check out this ${job.title} job at ${job.company}!`,
    url: `${window.location.origin}/details/${job.id}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard!");
    }
  } catch (err) {
    console.error("Error sharing:", err);
    toast.error("Error sharing: " + err.message);
    throw err;
  }
};

// Save job function (existing function that was already imported)
export const saveJob = async (job, user, type) => {
  try {
    // Check if already exists
    const q = query(
      collection(db, "jobsManage"),
      where("user.email", "==", user.email),
      where("type", "==", type),
      where("job.id", "==", job.id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return type === "Applied" ? "already_applied" : "already_saved";
    }

    // Add new document
    await addDoc(collection(db, "jobsManage"), {
      job: job,
      user: user,
      type: type,
      createdAt: new Date(),
    });

    return type === "Applied" ? "applied" : "saved";
  } catch (err) {
    console.error(`Error ${type.toLowerCase()}ing job:`, err);
    throw err;
  }
};




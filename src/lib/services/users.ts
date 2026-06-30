import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/lib/contexts/AuthContext";

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<boolean> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return false;
  }
}

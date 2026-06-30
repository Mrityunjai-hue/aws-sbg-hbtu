import { collection, getDocs, query, orderBy, Timestamp, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  email?: string;
  initial: string;
  createdAt: Timestamp | null;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const teamRef = collection(db, "team");
    const q = query(teamRef, orderBy("createdAt", "asc"));
    
    const querySnapshot = await getDocs(q);
    const members: TeamMember[] = [];
    
    querySnapshot.forEach((docSnap) => {
      members.push({ id: docSnap.id, ...docSnap.data() } as TeamMember);
    });
    
    return members;
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function addTeamMember(data: Omit<TeamMember, "id" | "createdAt" | "initial">): Promise<string | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const initial = data.name ? data.name.charAt(0).toUpperCase() : "U";
    
    const teamRef = collection(db, "team");
    const docRef = await addDoc(teamRef, {
      ...data,
      initial,
      createdAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Failed to add team member:", error);
    return null;
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "team", id);
    await deleteDoc(docRef);
    
    return true;
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return false;
  }
}

import { collection, getDocs, getDoc, updateDoc, query, orderBy, Timestamp, addDoc, doc, deleteDoc } from "firebase/firestore";
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

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "team", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TeamMember;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch team member:", error);
    return null;
  }
}

export async function updateTeamMember(id: string, data: Partial<Omit<TeamMember, "id" | "createdAt" | "initial">>): Promise<boolean> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "team", id);
    const updateData: any = { ...data };
    
    if (data.name) {
      updateData.initial = data.name.charAt(0).toUpperCase();
    }
    
    await updateDoc(docRef, updateData);
    
    return true;
  } catch (error) {
    console.error("Failed to update team member:", error);
    return false;
  }
}

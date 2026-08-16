import { collection, getDocs, query, orderBy, Timestamp, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  createdAt: Timestamp | null;
}

export async function fetchNotifications(): Promise<NotificationRecord[]> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const notifRef = collection(db, "notifications");
    // Get newest notifications first
    const q = query(notifRef, orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(q);
    const notifications: NotificationRecord[] = [];
    
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as NotificationRecord);
    });
    
    return notifications;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}

export async function createNotification(data: Omit<NotificationRecord, "id" | "createdAt">): Promise<string | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const notifRef = collection(db, "notifications");
    const docRef = await addDoc(notifRef, {
      ...data,
      createdAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
}

export async function getNotificationById(id: string): Promise<NotificationRecord | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "notifications", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as NotificationRecord;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch notification by id:", error);
    return null;
  }
}

export async function updateNotification(id: string, data: Partial<Omit<NotificationRecord, "id" | "createdAt">>): Promise<boolean> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "notifications", id);
    await updateDoc(docRef, data);
    
    return true;
  } catch (error) {
    console.error("Failed to update notification:", error);
    return false;
  }
}

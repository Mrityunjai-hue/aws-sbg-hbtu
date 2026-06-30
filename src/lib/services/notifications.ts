import { collection, getDocs, query, orderBy, Timestamp, addDoc } from "firebase/firestore";
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

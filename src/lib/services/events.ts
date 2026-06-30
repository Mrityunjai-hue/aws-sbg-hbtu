import { collection, getDocs, query, orderBy, limit, Timestamp, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface EventRecord {
  id: string;
  title: string;
  date: Timestamp | Date; // Firestore Timestamp
  type: string; // e.g. "Workshop", "Talk"
  time: string; // e.g. "4:00 PM IST"
  description?: string;
}

export async function fetchEvents(maxItems?: number): Promise<EventRecord[]> {
  try {
    if (!db) {
      console.warn("Firebase DB not initialized.");
      return [];
    }
    
    const eventsRef = collection(db, "events");
    
    let q = query(eventsRef, orderBy("date", "asc"));
    
    if (maxItems) {
      q = query(eventsRef, orderBy("date", "asc"), limit(maxItems));
    }
    
    const snapshot = await getDocs(q);
    const events: EventRecord[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        title: data.title,
        date: data.date,
        type: data.type,
        time: data.time,
        description: data.description,
      });
    });
    
    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function createEvent(data: Omit<EventRecord, "id">): Promise<string | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const eventsRef = collection(db, "events");
    const docRef = await addDoc(eventsRef, {
      ...data,
      createdAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Failed to create event:", error);
    return null;
  }
}

export async function getEventById(id: string): Promise<EventRecord | null> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as EventRecord;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch event by id:", error);
    return null;
  }
}

export async function updateEvent(id: string, data: Partial<Omit<EventRecord, "id" | "createdAt">>): Promise<boolean> {
  try {
    if (!db) throw new Error("Firebase DB not initialized");
    
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, data);
    
    return true;
  } catch (error) {
    console.error("Failed to update event:", error);
    return false;
  }
}

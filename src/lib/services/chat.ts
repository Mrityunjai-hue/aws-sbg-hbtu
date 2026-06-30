import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhotoURL: string | null;
  userRole?: string;
  createdAt: Timestamp | null;
}

export const sendMessage = async (text: string, userId: string, userName: string, userPhotoURL: string | null, userRole?: string) => {
  if (!text.trim()) return;
  
  try {
    const messagesRef = collection(db!, "messages");
    await addDoc(messagesRef, {
      text,
      userId,
      userName,
      userPhotoURL,
      userRole: userRole || "member",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const subscribeToMessages = (
  callback: (messages: ChatMessage[]) => void,
  messageLimit: number = 50
) => {
  if (!db) return () => {};

  const messagesRef = collection(db, "messages");
  // Order by createdAt descending to get the latest, but we will reverse them in the UI to show bottom-up
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(messageLimit));

  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const fetchedMessages: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      fetchedMessages.push({
        id: doc.id,
        ...doc.data(),
      } as ChatMessage);
    });
    
    // Reverse so the newest message is at the end of the array (bottom of the screen)
    callback(fetchedMessages.reverse());
  });
};

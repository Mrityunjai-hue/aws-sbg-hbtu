"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

interface ChatNotificationContextType {
  hasUnread: boolean;
  markAsRead: () => void;
}

const ChatNotificationContext = createContext<ChatNotificationContextType>({
  hasUnread: false,
  markAsRead: () => {},
});

export function ChatNotificationProvider({ children }: { children: ReactNode }) {
  const [hasUnread, setHasUnread] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const markAsRead = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastReadChat', Date.now().toString());
      setHasUnread(false);
    }
  };

  useEffect(() => {
    if (pathname === '/chat') {
      markAsRead();
    }
  }, [pathname]);

  useEffect(() => {
    if (!db || !user) return; // Only listen if user is logged in
    
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const latestDoc = snapshot.docs[0];
        const latestTime = latestDoc.data().createdAt?.toMillis() || 0;
        const latestUserId = latestDoc.data().userId;
        
        // Don't notify if the user themselves sent the latest message
        if (latestUserId === user.uid) {
          markAsRead();
          return;
        }

        const lastReadStr = typeof window !== 'undefined' ? localStorage.getItem('lastReadChat') : '0';
        const lastRead = parseInt(lastReadStr || '0', 10);

        if (latestTime > lastRead) {
          // If we are currently on the chat page, auto-read instead of notifying
          if (window.location.pathname === '/chat') {
            markAsRead();
          } else {
            setHasUnread(true);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <ChatNotificationContext.Provider value={{ hasUnread, markAsRead }}>
      {children}
    </ChatNotificationContext.Provider>
  );
}

export const useChatNotification = () => useContext(ChatNotificationContext);

"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { subscribeToMessages, sendMessage, ChatMessage } from "@/lib/services/chat";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  const { user, userProfile, loading } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToMessages((fetchedMessages) => {
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    // Auto-scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    
    try {
      await sendMessage(
        newMessage, 
        user.uid, 
        userProfile?.name || user.displayName || "Anonymous Builder", 
        userProfile?.photoURL || user.photoURL,
        userProfile?.teamRole || userProfile?.role || "member"
      );
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-text-muted">Loading chat...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <h2 className="text-2xl font-bold text-text mb-4">Global Chat</h2>
        <p className="text-text-muted mb-8">You must be signed in to join the conversation.</p>
        <Button onClick={() => window.location.href = '/login'}>Sign in to Chat</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-5xl mx-auto border-x border-border-hairline bg-bg">
      <div className="flex items-center px-6 py-4 border-b border-border-hairline bg-bg-card">
        <div>
          <h1 className="text-xl font-bold text-text">Global Chat</h1>
          <p className="text-xs text-text-muted">Connect with the AWS SBG community</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-text-muted mt-10">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userId === user.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-border-hairline flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {msg.userPhotoURL ? (
                    <img src={msg.userPhotoURL} alt={msg.userName} className="w-full h-full object-cover" />
                  ) : (
                    msg.userName.charAt(0).toUpperCase()
                  )}
                </div>
                
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  <span className={`text-[10px] text-text-muted mb-1 ${isMe ? 'mr-1' : 'ml-1'} flex items-baseline gap-1`}>
                    {msg.userName}
                    {msg.userRole && msg.userRole !== 'member' && (
                      <sub className="text-[8px] text-accent font-bold uppercase tracking-wider bg-accent/10 px-1 rounded">
                        {msg.userRole === 'admin' ? 'Core' : msg.userRole}
                      </sub>
                    )}
                  </span>
                  
                  <div className={`px-4 py-2 rounded-2xl text-sm ${
                    isMe 
                      ? 'bg-accent text-[#0F1420] rounded-tr-sm' 
                      : 'bg-bg-card text-text border border-border-hairline rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-bg-card border-t border-border-hairline">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-bg border border-border-hairline rounded-full px-5 py-2.5 text-sm text-text focus:outline-none focus:border-accent transition-colors"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full bg-accent text-[#0F1420] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { subscribeToMessages, sendMessage, ChatMessage } from "@/lib/services/chat";
import { fetchTeamMembers, TeamMember } from "@/lib/services/team";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { user, userProfile, loading } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTeamMembers().then(setTeamMembers);
  }, []);

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
      const coreMember = teamMembers.find(m => m.email && user.email && m.email.toLowerCase() === user.email.toLowerCase());
      const roleToSave = coreMember?.role || userProfile?.teamRole || userProfile?.role || "member";

      await sendMessage(
        newMessage, 
        user.uid, 
        userProfile?.name || user.displayName || "Anonymous Builder", 
        userProfile?.photoURL || user.photoURL,
        roleToSave
      );
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-text-muted text-center animate-pulse">Loading chat...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-64px)] pt-20">
        <h2 className="text-3xl font-heading font-bold text-text mb-4">Global Chat</h2>
        <p className="text-text-muted mb-8 max-w-sm text-center">Join the community conversation, share ideas, and connect with other builders.</p>
        <Button onClick={() => window.location.href = '/login'}>Sign in to Chat</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] max-w-5xl mx-auto border-x border-border-hairline bg-bg relative overflow-hidden">
      
      {/* Subtle Abstract Radial Gradient Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(184, 116, 250, 0.08) 0%, rgba(17, 24, 39, 0) 70%)'
      }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Glassmorphic */}
        <div className="flex items-center px-6 py-4 border-b border-border-hairline bg-bg/60 backdrop-blur-md">
          <div>
            <h1 className="text-xl font-bold text-text">Global Chat</h1>
            <p className="text-xs text-text-muted">Connect with the AWS SBG community</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 space-y-6 scroll-smooth">
          {messages.length === 0 ? (
            <div className="text-center text-text-muted mt-10">No messages yet. Start the conversation!</div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isMe = msg.userId === user.uid;
                return (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-3`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-border-hairline flex items-center justify-center text-xs font-bold text-white overflow-hidden shadow-lg border border-white/10">
                      {msg.userPhotoURL ? (
                        <img src={msg.userPhotoURL} alt={msg.userName} className="w-full h-full object-cover" />
                      ) : (
                        msg.userName.charAt(0).toUpperCase()
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[75%]`}>
                      <span className={`text-[10px] text-text-muted mb-1 ${isMe ? 'mr-1' : 'ml-1'} flex items-baseline gap-1`}>
                        {msg.userName}
                        {msg.userRole && msg.userRole !== 'member' && (
                          <sub className="text-[8px] text-accent font-bold uppercase tracking-wider bg-accent/10 px-1 rounded">
                            {msg.userRole === 'admin' ? 'Core' : msg.userRole}
                          </sub>
                        )}
                      </span>
                      
                      <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm backdrop-blur-md border ${
                        isMe 
                          ? 'bg-accent/20 border-accent/30 text-text rounded-tr-sm' 
                          : 'bg-white/5 border-white/10 text-text rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Glassmorphic, with Mobile Safe Bottom Padding */}
        <div className="p-4 pb-[100px] md:pb-6 border-t border-border-hairline bg-bg/80 backdrop-blur-md w-full">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-colors shadow-inner"
            />
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              type="submit" 
              disabled={!newMessage.trim()}
              className="w-10 h-10 rounded-full bg-accent text-[#0F1420] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-accent/20"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}

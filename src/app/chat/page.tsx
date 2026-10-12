"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { subscribeToMessages, sendMessage, ChatMessage } from "@/lib/services/chat";
import { fetchTeamMembers, TeamMember } from "@/lib/services/team";
import { Button, Card, Badge } from "@/components/ui";
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const coreMember = teamMembers.find(
        (m) => m.email && user.email && m.email.toLowerCase() === user.email.toLowerCase()
      );
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
      console.error("Failed to send chat message:", error);
    }
  };

  if (loading) {
    return (
      <div className="site-container py-20 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-text-muted animate-pulse">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>INITIALIZING CHAT CHANNEL...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="site-container py-16 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
        <Card variant="terminal" className="max-w-md w-full p-8 text-center space-y-6">
          <Badge variant="purple" size="sm" className="font-mono">
            BUILDER ROOM
          </Badge>
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-border-hairline flex items-center justify-center text-accent mx-auto">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <div>
            <h1 className="font-sans text-2xl font-bold text-text mb-2">
              Global Builder Chat
            </h1>
            <p className="text-sm text-text-muted leading-relaxed">
              Sign in with your verified HBTU account to participate in real-time discussion, share
              code snippets, and connect with peers.
            </p>
          </div>
          <div>
            <Button
              as={Link}
              href="/login"
              variant="aws"
              size="lg"
              className="w-full font-bold text-sm"
            >
              Sign In to Enter Room
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="site-container py-6 sm:py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="relative flex-1 flex flex-col rounded-2xl border border-border-hairline bg-surface/90 dark:bg-surface-elevated/40 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Chat Room Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-hairline bg-surface-elevated/70">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h1 className="font-sans font-bold text-base text-text leading-tight">
                Global Builder Chat
              </h1>
              <p className="font-mono text-[11px] text-text-muted">
                AWS Student Builder Group · HBTU Chapter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="mono" size="sm">
              LIVE FIRESTORE
            </Badge>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted">
              <span className="font-mono text-xs uppercase tracking-wider text-accent mb-1">
                CHANNEL READY
              </span>
              <p className="text-sm">No messages yet in this channel. Say hello to fellow builders!</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isMe = msg.userId === user.uid;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className={`flex ${isMe ? "flex-row-reverse" : "flex-row"} gap-3 items-end`}
                  >
                    {/* User Avatar */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-surface-elevated border border-border-hairline flex items-center justify-center text-xs font-bold text-accent overflow-hidden shadow-xs">
                      {msg.userPhotoURL ? (
                        <img
                          src={msg.userPhotoURL}
                          alt={msg.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        msg.userName.charAt(0).toUpperCase()
                      )}
                    </div>

                    {/* Message Bubble & Metadata */}
                    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%]`}>
                      <div className={`flex items-center gap-2 text-[11px] text-text-muted mb-1 ${isMe ? "mr-1" : "ml-1"}`}>
                        <span className="font-semibold text-text">{msg.userName}</span>
                        {msg.userRole && msg.userRole !== "member" && (
                          <Badge variant="purple" size="sm" className="font-mono text-[9px] py-0 px-1.5">
                            {msg.userRole === "admin" ? "Core Team" : msg.userRole}
                          </Badge>
                        )}
                      </div>

                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed border shadow-xs ${
                          isMe
                            ? "bg-accent/20 border-accent/40 text-text rounded-br-sm"
                            : "bg-surface-elevated border-border-hairline text-text rounded-bl-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border-hairline bg-surface-elevated/70">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share thoughts, project updates, or questions..."
              className="flex-1 rounded-xl border border-border-hairline bg-surface/80 px-4 py-3 text-sm text-text placeholder-text-muted/60 focus:border-accent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="btn-3d-aws h-11 px-5 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              title="Send Message"
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

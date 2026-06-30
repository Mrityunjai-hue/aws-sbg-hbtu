"use client";

import { useState } from "react";
import { Card, Button } from "@/components/ui";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !year) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      if (!db) throw new Error("Database not initialized");
      
      await addDoc(collection(db, "joinRequests"), {
        name,
        email,
        year,
        createdAt: Timestamp.now(),
      });

      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-20 min-h-[calc(100vh-64px)] flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-container relative z-10 w-full">
        {!isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mx-auto max-w-xl"
          >
            <div className="mb-10 text-center">
              <h1 className="mb-4 font-heading text-4xl md:text-5xl font-extrabold text-text">Join the Group</h1>
              <p className="text-lg text-text-muted">Take the first step towards building the future on AWS.</p>
            </div>
            
            <Card className="p-6 md:p-8 backdrop-blur-md bg-bg-card/80 border-border-hairline shadow-2xl">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-text">Membership Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors" 
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="email">University Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors" 
                    placeholder="student@hbtu.ac.in"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="year">Year of Study</label>
                  <select 
                    id="year" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors appearance-none"
                  >
                    <option value="">Select Year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full py-4 text-base font-bold" isLoading={loading}>
                    Submit Application
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>
            
            <h1 className="mb-4 font-heading text-4xl font-extrabold text-text">Welcome to the Club!</h1>
            <p className="text-lg text-text-muted mb-10">
              Your application has been received. To complete your onboarding and stay up-to-date, please complete the next two steps:
            </p>

            <div className="space-y-4">
              <a 
                href="https://chat.whatsapp.com/Ks9kB05Odpt8nE2TpjLE4l?s=sw&p=a&mlu=0&amv=1" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between w-full bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                  <span>Join our WhatsApp Community</span>
                </div>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>

              <a 
                href="https://www.linkedin.com/company/awssbghbtu/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between w-full bg-[#0A66C2] hover:bg-[#084e96] text-white p-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">work</span>
                  <span>Follow us on LinkedIn</span>
                </div>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-8 text-sm text-text-muted hover:text-accent transition-colors underline underline-offset-4"
            >
              Return to Home Page
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

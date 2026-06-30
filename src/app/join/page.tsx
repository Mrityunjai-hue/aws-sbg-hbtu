"use client";

import { useState } from "react";
import { Card, Button } from "@/components/ui";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !year) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      if (!db) throw new Error("Database not initialized");
      
      await addDoc(collection(db, "joinRequests"), {
        name,
        email,
        year,
        createdAt: Timestamp.now(),
      });

      setSuccess(true);
      toast.success("Application submitted successfully!");
      
      setName("");
      setEmail("");
      setYear("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-container">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-heading text-5xl font-extrabold text-text">Join the Group</h1>
          <p className="text-lg text-text-muted">Take the first step towards building the future on AWS.</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="p-8">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-text">Membership Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
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
                  className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                  placeholder="student@hbtu.ac.in"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="year">Year of Study</label>
                <select 
                  id="year" 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-md border border-border-hairline bg-bg p-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full py-3" isLoading={loading} isSuccess={success}>
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

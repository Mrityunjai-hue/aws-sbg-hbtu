"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { createEvent } from "@/lib/services/events";
import { Button, Card, Input } from "@/components/ui";
import { Timestamp } from "firebase/firestore";

export default function CreateEventPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!loading && userProfile?.role !== "admin") {
    // If they aren't an admin, redirect them out
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      // Parse the local date string to a JS Date, then to a Firestore Timestamp
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date provided.");
      }

      const eventId = await createEvent({
        title,
        type,
        time,
        date: Timestamp.fromDate(dateObj),
        description,
      });

      if (eventId) {
        setSuccess(true);
        setTimeout(() => router.push("/events"), 1000);
      } else {
        throw new Error("Failed to create event.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-text">Create Event</h1>
            <p className="text-text-muted mt-2">Add a new event to the community board.</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Event Title</label>
                <Input 
                  placeholder="Intro to Serverless" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-muted">Type</label>
                  <Input 
                    placeholder="Workshop, Talk, Hackathon" 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-muted">Time (String)</label>
                  <Input 
                    placeholder="4:00 PM IST" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Date</label>
                <Input 
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Description (Optional)</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-border-hairline bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Details about the event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => router.push("/dashboard")}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={submitting}
                  isLoading={submitting}
                  isSuccess={success}
                >
                  {success ? "Created!" : "Create Event"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getEventById, updateEvent } from "@/lib/services/events";
import { Button, Card, Input } from "@/components/ui";
import { Timestamp } from "firebase/firestore";

export default function EditEventPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(true);

  useEffect(() => {
    if (!authLoading && userProfile?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [authLoading, userProfile, router]);

  useEffect(() => {
    async function loadEvent() {
      if (!eventId) return;
      try {
        const event = await getEventById(eventId);
        if (event) {
          setTitle(event.title || "");
          setType(event.type || "");
          setTime(event.time || "");
          setDescription(event.description || "");
          
          if (event.date) {
            const jsDate = event.date instanceof Timestamp ? event.date.toDate() : new Date(event.date);
            // format as YYYY-MM-DD for the input type="date"
            setDateStr(jsDate.toISOString().split("T")[0]);
          }
        } else {
          setError("Event not found.");
        }
      } catch {
        setError("Failed to load event.");
      } finally {
        setLoadingEvent(false);
      }
    }
    loadEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date provided.");
      }

      const success = await updateEvent(eventId, {
        title,
        type,
        time,
        date: Timestamp.fromDate(dateObj),
        description,
      });

      if (success) {
        router.push("/events");
      } else {
        throw new Error("Failed to update event.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loadingEvent) {
    return (
      <ProtectedRoute>
        <div className="px-4 py-20 text-center text-text-muted">Loading event details...</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-text">Edit Event</h1>
            <p className="text-text-muted mt-2">Update the details of this event.</p>
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
                  onClick={() => router.push("/events")}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

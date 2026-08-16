"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getNotificationById, updateNotification } from "@/lib/services/notifications";
import { Button, Card, Input } from "@/components/ui";

export default function EditNotificationPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const notificationId = params.id as string;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loadingNotif, setLoadingNotif] = useState(true);

  useEffect(() => {
    if (!authLoading && userProfile?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [authLoading, userProfile, router]);

  useEffect(() => {
    async function loadNotification() {
      if (!notificationId) return;
      try {
        const notif = await getNotificationById(notificationId);
        if (notif) {
          setTitle(notif.title || "");
          setMessage(notif.message || "");
        } else {
          setError("Announcement not found.");
        }
      } catch {
        setError("Failed to load announcement.");
      } finally {
        setLoadingNotif(false);
      }
    }
    loadNotification();
  }, [notificationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const success = await updateNotification(notificationId, {
        title,
        message,
      });

      if (success) {
        router.push("/notifications");
      } else {
        throw new Error("Failed to update announcement.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loadingNotif) {
    return (
      <ProtectedRoute>
        <div className="px-4 py-20 text-center text-text-muted">Loading announcement details...</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-text">Edit Announcement</h1>
            <p className="text-text-muted mt-2">Update community notification details.</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Notification Title</label>
                <Input 
                  placeholder="New Hackathon Announcement!" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Message</label>
                <textarea 
                  className="flex min-h-[120px] w-full rounded-md border border-border-hairline bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Details about the announcement..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => router.push("/notifications")}
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

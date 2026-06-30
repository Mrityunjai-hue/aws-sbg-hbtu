"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { createNotification } from "@/lib/services/notifications";
import { Button, Card, Input } from "@/components/ui";

export default function CreateNotificationPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!loading && userProfile?.role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      const notifId = await createNotification({
        title,
        message,
      });

      if (notifId) {
        setSuccess(true);
        setTimeout(() => router.push("/notifications"), 1000);
      } else {
        throw new Error("Failed to create notification.");
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
            <h1 className="font-heading text-4xl font-bold text-text">Create Notification</h1>
            <p className="text-text-muted mt-2">Send an announcement to the community.</p>
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
                  {success ? "Sent!" : "Send Notification"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

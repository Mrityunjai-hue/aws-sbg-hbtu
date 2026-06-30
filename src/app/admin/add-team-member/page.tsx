"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { addTeamMember } from "@/lib/services/team";
import { Button, Card, Input } from "@/components/ui";
import { toast } from "sonner";

export default function AddTeamMemberPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && userProfile?.role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      const memberId = await addTeamMember({
        name,
        email,
        role,
        photoUrl,
      });

      if (memberId) {
        setSuccess(true);
        toast.success("Team member added successfully!");
        setTimeout(() => {
          router.push("/team");
        }, 1500);
      } else {
        throw new Error("Failed to add team member.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
      toast.error("Failed to add team member.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-text">Add Team Member</h1>
            <p className="text-text-muted mt-2">Add a new core team member to the community board.</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Full Name</label>
                <Input 
                  placeholder="e.g. Aditi Sharma" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Email (Optional)</label>
                <Input 
                  type="email"
                  placeholder="e.g. aditi@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-text-muted mt-1">Used to link their chat messages to their core team role.</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Role / Title</label>
                <Input 
                  placeholder="e.g. Captain" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Profile Image URL (Optional)</label>
                <Input 
                  placeholder="https://i.imgur.com/example.jpg" 
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <p className="text-xs text-text-muted mt-1">If left blank, their initial will be displayed instead.</p>
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
                  {success ? "Added!" : "Add Member"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

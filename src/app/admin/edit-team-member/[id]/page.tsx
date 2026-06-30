"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getTeamMember, updateTeamMember } from "@/lib/services/team";
import { Button, Card, Input } from "@/components/ui";
import { toast } from "sonner";

export default function EditTeamMemberPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMember() {
      try {
        const member = await getTeamMember(id);
        if (member) {
          setName(member.name || "");
          setEmail(member.email || "");
          setRole(member.role || "");
          setPhotoUrl(member.photoUrl || "");
        } else {
          toast.error("Team member not found.");
          router.push("/team");
        }
      } catch (err) {
        toast.error("Failed to load team member.");
        router.push("/team");
      } finally {
        setLoading(false);
      }
    }
    loadMember();
  }, [id, router]);

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
      const isUpdated = await updateTeamMember(id, {
        name,
        email,
        role,
        photoUrl,
      });

      if (isUpdated) {
        setSuccess(true);
        toast.success("Team member updated successfully!");
        setTimeout(() => {
          router.push("/team");
        }, 1500);
      } else {
        throw new Error("Failed to update team member.");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
      toast.error("Failed to update team member.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-text">Edit Hero</h1>
            <p className="text-text-muted mt-2">Update the details of a community hero.</p>
          </div>

          <Card className="p-8">
            {loading ? (
              <div className="text-center py-8 text-text-muted">Loading details...</div>
            ) : (
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
                  <p className="text-xs text-text-muted mt-1">Used to link their chat messages to their official role.</p>
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
                    variant="ghost" 
                    onClick={() => router.push("/team")}
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
                    {success ? "Updated!" : "Update Hero"}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

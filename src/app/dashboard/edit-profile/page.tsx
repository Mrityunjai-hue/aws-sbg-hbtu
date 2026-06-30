"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { updateUserProfile } from "@/lib/services/users";
import { Button, Card, Input } from "@/components/ui";

export default function EditProfilePage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skillsStr, setSkillsStr] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  
  const [photoURL, setPhotoURL] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setBio(userProfile.bio || "");
      setSkillsStr(userProfile.skills?.join(", ") || "");
      setGithubUrl(userProfile.githubUrl || "");
      setLinkedinUrl(userProfile.linkedinUrl || "");
      if (userProfile.photoURL) {
        setPhotoURL(userProfile.photoURL);
      }
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    setError("");

    try {
      // Clean up skills string into an array
      const skillsArray = skillsStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const success = await updateUserProfile(user.uid, {
        name,
        bio,
        skills: skillsArray,
        githubUrl,
        linkedinUrl,
        photoURL,
      });

      if (success) {
        window.location.href = "/dashboard";
      } else {
        throw new Error("Failed to update profile.");
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
            <h1 className="font-heading text-4xl font-bold text-text">Edit Profile</h1>
            <p className="text-text-muted mt-2">Personalize your community dashboard.</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-hairline bg-bg-card">
                  {photoURL ? (
                    <img src={photoURL} alt="Profile Preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-text-muted">person</span>
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <label className="text-sm font-medium text-text-muted">Profile Picture URL</label>
                  <Input 
                    placeholder="https://example.com/my-photo.jpg" 
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                  <p className="text-xs text-text-muted mt-2">
                    Since Firebase Storage isn&apos;t enabled, please paste a direct link to an image. <br/>
                    <strong>Tip:</strong> To get a direct link from sites like Imgur or GitHub, right-click the photo and select &quot;Copy image address&quot;. The link should end in .png or .jpg!
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Bio</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-border-hairline bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Tell the community a bit about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-muted">Skills / Tech Stack</label>
                <Input 
                  placeholder="React, Node.js, AWS Lambda" 
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                />
                <p className="text-xs text-text-muted">Separate multiple skills with commas.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-muted">GitHub URL</label>
                  <Input 
                    placeholder="https://github.com/johndoe" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-muted">LinkedIn URL</label>
                  <Input 
                    placeholder="https://linkedin.com/in/johndoe" 
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
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
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

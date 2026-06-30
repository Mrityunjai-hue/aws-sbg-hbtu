"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Card } from "@/components/ui";

export default function DashboardPage() {
  const { user, userProfile } = useAuth();

  return (
    <ProtectedRoute>
      <div className="px-4 py-20">
        <div className="mx-auto max-w-container">
          <div className="mb-12">
            <h1 className="font-heading text-4xl font-bold text-text">Dashboard</h1>
            <p className="text-text-muted mt-2">Welcome back, {user?.email}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <Card className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-hairline bg-bg-card">
                      {userProfile?.photoURL ? (
                        <img src={userProfile.photoURL} alt={userProfile.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-text-muted">person</span>
                      )}
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl font-bold text-text">
                        Welcome, {userProfile?.name?.split(" ")[0] || "Member"}! 👋
                      </h2>
                      <p className="text-text-muted mt-1 text-lg">
                        {userProfile?.role === "admin" ? "Community Administrator" : "Community Member"}
                      </p>
                    </div>
                  </div>

                  {userProfile?.bio && (
                    <p className="text-text-muted mb-6">{userProfile.bio}</p>
                  )}

                  {userProfile?.skills && userProfile.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-text mb-2">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, i) => (
                          <span key={i} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(userProfile?.githubUrl || userProfile?.linkedinUrl) && (
                    <div className="flex gap-4 mb-6">
                      {userProfile.githubUrl && (
                        <a href={userProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent flex items-center gap-1 text-sm font-medium transition-colors">
                          <span className="material-symbols-outlined text-[18px]">link</span> GitHub
                        </a>
                      )}
                      {userProfile.linkedinUrl && (
                        <a href={userProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent flex items-center gap-1 text-sm font-medium transition-colors">
                          <span className="material-symbols-outlined text-[18px]">link</span> LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border-hairline">
                  <a href="/dashboard/edit-profile" className="inline-flex items-center gap-2 font-medium text-accent hover:underline">
                    <span className="material-symbols-outlined text-[20px]">edit</span> Edit Profile
                  </a>
                </div>
              </Card>
            </div>

            <div className="col-span-1 flex flex-col gap-6">
              <Card className="p-6">
                <h2 className="font-heading text-2xl font-semibold text-text">Quick Actions</h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/events" className="text-accent hover:underline">View Upcoming Events</a>
                  </li>
                  <li>
                    <a href="/tracks" className="text-accent hover:underline">Explore Learning Tracks</a>
                  </li>
                </ul>
              </Card>

              {userProfile?.role === "admin" && (
                <Card className="border-accent/50 p-6">
                  <h2 className="font-heading text-xl font-semibold text-text">Admin Actions</h2>
                  <p className="mt-2 text-sm text-text-muted">You have community management privileges.</p>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <a href="/admin/create-event" className="flex items-center gap-2 font-medium text-accent hover:underline">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span> Create New Event
                      </a>
                    </li>
                    <li>
                      <a href="/admin/add-team-member" className="flex items-center gap-2 font-medium text-accent hover:underline">
                        <span className="material-symbols-outlined text-[20px]">person_add</span> Add Team Member
                      </a>
                    </li>
                    <li>
                      <a href="/admin/create-notification" className="flex items-center gap-2 font-medium text-accent hover:underline">
                        <span className="material-symbols-outlined text-[20px]">campaign</span> Create Notification
                      </a>
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

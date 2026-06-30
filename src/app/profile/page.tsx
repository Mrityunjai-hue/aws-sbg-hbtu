"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();

  if (loading) return <div className="p-8 text-text-muted">Loading profile...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
        <p className="text-text-muted mb-8">Please sign in to manage your profile.</p>
        <Button onClick={() => window.location.href = '/login'}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 font-heading">Settings & Profile</h1>
      
      <div className="bg-bg-card border border-border-hairline rounded-lg p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border-hairline">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-3xl text-accent font-bold overflow-hidden border-2 border-accent">
            {user.photoURL || userProfile?.photoURL ? (
              <img src={user.photoURL || userProfile?.photoURL || ''} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              (userProfile?.name || user.displayName || user.email || '?')[0].toUpperCase()
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text">{userProfile?.name || user.displayName || 'Anonymous Builder'}</h2>
            <p className="text-text-muted">{user.email}</p>
            <div className="mt-2 text-xs font-bold px-2 py-1 bg-white/5 border border-border-hairline rounded inline-block uppercase">
              {userProfile?.role || 'Member'}
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Display Name</label>
              <input type="text" defaultValue={userProfile?.name || user.displayName || ''} className="w-full bg-bg border border-border-hairline rounded px-4 py-2 text-text outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">GitHub URL</label>
              <input type="url" defaultValue={userProfile?.githubUrl || ''} placeholder="https://github.com/..." className="w-full bg-bg border border-border-hairline rounded px-4 py-2 text-text outline-none focus:border-accent" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text">Bio</label>
            <textarea rows={4} defaultValue={userProfile?.bio || ''} placeholder="Tell the community about yourself..." className="w-full bg-bg border border-border-hairline rounded px-4 py-2 text-text outline-none focus:border-accent resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button" onClick={() => alert("Profile update functionality coming soon!")}>Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function Topnav() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAppsDropdown, setShowAppsDropdown] = useState(false);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border-hairline bg-[#0F1420] px-4">
      <div className="flex items-center gap-4 md:w-64">
        <Link href="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
          <span className="font-sans text-2xl font-black tracking-tighter text-white mr-1" style={{ fontFamily: 'Arial, sans-serif' }}>aws</span>
          <span className="text-[10px] uppercase font-bold text-text-muted mt-2 border-l border-border-hairline pl-1.5 leading-none">Builder<br/>Group</span>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center md:flex">
        <div className="flex h-9 w-[400px] items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 focus-within:border-accent">
          <span className="material-symbols-outlined text-[18px] text-text-muted">search</span>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => { setShowAddDropdown(!showAddDropdown); setShowAppsDropdown(false); }}
            className="text-text-muted hover:text-text transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          {showAddDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-hairline rounded shadow-lg py-1 z-50">
              <Link href="/join" className="block px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Submit an Idea</Link>
              <Link href="/events" className="block px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Suggest an Event</Link>
              {userProfile?.role === 'admin' && (
                <Link href="/admin/add-team-member" className="block px-4 py-2 text-sm text-accent hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Add Team Member</Link>
              )}
            </div>
          )}
        </div>

        <Link href="/profile" className="text-text-muted hover:text-text transition-colors flex items-center">
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </Link>
        
        <div className="relative hidden sm:block">
          <button 
            onClick={() => { setShowAppsDropdown(!showAppsDropdown); setShowAddDropdown(false); }}
            className="text-text-muted hover:text-text transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          {showAppsDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-bg-card border border-border-hairline rounded shadow-lg p-4 z-50 grid grid-cols-2 gap-4">
              <a href="https://aws.amazon.com/console/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded text-center transition-colors">
                <span className="material-symbols-outlined text-accent text-2xl">cloud</span>
                <span className="text-xs text-text">AWS Console</span>
              </a>
              <a href="https://skillbuilder.aws/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded text-center transition-colors">
                <span className="material-symbols-outlined text-accent text-2xl">school</span>
                <span className="text-xs text-text">Skill Builder</span>
              </a>
              <a href="https://aws.amazon.com/education/awseducate/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded text-center transition-colors">
                <span className="material-symbols-outlined text-accent text-2xl">menu_book</span>
                <span className="text-xs text-text">AWS Educate</span>
              </a>
              <Link href="/chat" className="flex flex-col items-center gap-2 p-2 hover:bg-white/5 rounded text-center transition-colors" onClick={() => setShowAppsDropdown(false)}>
                <span className="material-symbols-outlined text-accent text-2xl">chat</span>
                <span className="text-xs text-text">Global Chat</span>
              </Link>
            </div>
          )}
        </div>
        
        {!loading && user ? (
          <button onClick={handleLogout} className="h-8 px-4 text-xs font-semibold rounded bg-white text-[#0F1420] hover:bg-gray-200 border-none transition-colors">
            Sign out
          </button>
        ) : (
          <Link href="/login" className="inline-flex items-center justify-center h-8 px-4 text-xs font-semibold rounded bg-white text-[#0F1420] hover:bg-gray-200 border-none transition-colors">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

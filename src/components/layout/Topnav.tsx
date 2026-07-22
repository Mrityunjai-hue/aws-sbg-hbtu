"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

/**
 * Fixed top navigation bar shown on every page.
 *
 * Renders the brand logo, quick-action dropdowns (Add, Apps), chat and
 * theme-toggle buttons, and either a Sign in link or the signed-in user's
 * profile avatar dropdown (Manage Profile, Dashboard, Sign out). All
 * dropdowns close on outside click or scroll.
 */
export function Topnav() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAppsDropdown, setShowAppsDropdown] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const addDropdownRef = useRef<HTMLDivElement>(null);
  const appsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAddDropdown && !showAppsDropdown && !showProfileDropdown) return;

    const closeDropdowns = () => {
      setShowAddDropdown(false);
      setShowAppsDropdown(false);
      setShowProfileDropdown(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !addDropdownRef.current?.contains(target) &&
        !appsDropdownRef.current?.contains(target) &&
        !profileDropdownRef.current?.contains(target)
      ) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", closeDropdowns, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", closeDropdowns, true);
    };
  }, [showAddDropdown, showAppsDropdown, showProfileDropdown]);

  // Sync toggle state with the theme class applied pre-hydration by the
  // inline script in layout.tsx (which prevents a dark-theme flash).
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    document.documentElement.classList.toggle("light", nextIsLight);
    localStorage.setItem("theme", nextIsLight ? "light" : "dark");
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border-hairline bg-[var(--topnav-bg)] px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-4 md:w-64">
        <Link href="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
          <span className="font-sans text-2xl font-black tracking-tighter text-text mr-1" style={{ fontFamily: 'Arial, sans-serif' }}>aws</span>
          <span className="text-[10px] uppercase font-bold text-text-muted mt-2 border-l border-border-hairline pl-1.5 leading-none">Builder<br/>Group</span>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center md:flex">
        {/* Search bar removed to avoid confusion since it's not hooked up to a backend yet */}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <div className="relative" ref={addDropdownRef}>
          <button
            onClick={() => { setShowAddDropdown(!showAddDropdown); setShowAppsDropdown(false); setShowProfileDropdown(false); }}
            aria-expanded={showAddDropdown}
            aria-label="Add"
            title="Add"
            className={`flex items-center rounded p-1 transition-colors ${
              showAddDropdown
                ? "bg-accent/15 text-accent"
                : "text-text-muted hover:text-text"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          {showAddDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mt-2 w-48 bg-bg-card border border-border-hairline rounded shadow-lg py-1 z-50">
              <Link href="/join" className="block px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Submit an Idea</Link>
              <Link href="/events" className="block px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Suggest an Event</Link>
              {userProfile?.role === 'admin' && (
                <Link href="/admin/add-team-member" className="block px-4 py-2 text-sm text-accent hover:bg-white/5" onClick={() => setShowAddDropdown(false)}>Add Team Member</Link>
              )}
            </div>
          )}
        </div>

        <Link href="/chat" className="text-text-muted hover:text-text transition-colors flex items-center" title="Global Chat">
          <span className="material-symbols-outlined text-[20px]">chat</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="text-text-muted hover:text-text transition-colors flex items-center"
          title={isLight ? "Switch to dark theme" : "Switch to light theme"}
          aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        >
          <span className="material-symbols-outlined text-[20px]">{isLight ? "dark_mode" : "light_mode"}</span>
        </button>
        
        <div className="relative hidden sm:block" ref={appsDropdownRef}>
          <button
            onClick={() => { setShowAppsDropdown(!showAppsDropdown); setShowAddDropdown(false); setShowProfileDropdown(false); }}
            aria-expanded={showAppsDropdown}
            aria-label="Apps"
            title="Apps"
            className={`flex items-center rounded p-1 transition-colors ${
              showAppsDropdown
                ? "bg-accent/15 text-accent"
                : "text-text-muted hover:text-text"
            }`}
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
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowAddDropdown(false); setShowAppsDropdown(false); }}
              aria-expanded={showProfileDropdown}
              title="Profile"
              className={`flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border transition-colors ${
                showProfileDropdown
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border-hairline hover:border-accent/60"
              }`}
            >
              {userProfile?.photoURL || user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userProfile?.photoURL || user.photoURL || ""}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-accent/15 text-xs font-bold text-accent">
                  {(userProfile?.name || user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-hairline rounded shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-border-hairline">
                  <p className="text-sm font-semibold text-text truncate">{userProfile?.name || user.displayName || "Builder"}</p>
                  <p className="text-xs text-text-muted truncate">{user.email}</p>
                </div>
                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowProfileDropdown(false)}>
                  <span className="material-symbols-outlined text-[18px] text-text-muted">manage_accounts</span>
                  Manage Profile
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-white/5" onClick={() => setShowProfileDropdown(false)}>
                  <span className="material-symbols-outlined text-[18px] text-text-muted">dashboard</span>
                  Dashboard
                </Link>
                <button
                  onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 border-t border-border-hairline mt-1 pt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : !loading ? (
          <Link href="/login" className="inline-flex items-center justify-center h-8 px-4 text-xs font-semibold rounded bg-text text-bg hover:opacity-90 border-none transition-opacity whitespace-nowrap">
            Sign in
          </Link>
        ) : null}
      </div>
    </header>
  );
}

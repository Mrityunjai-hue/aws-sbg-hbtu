"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MobileDrawer } from "@/components/layout/MobileDrawer";

/**
 * Floating Island Header & Navigation Component.
 * Exactly replicates the reference site's floating shell, pill menu,
 * interaction states, and responsive drawer on desktop and mobile.
 */
export function Topnav() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isLight, setIsLight] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const communityRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Sync theme with localStorage & pre-hydration class
  useEffect(() => {
    const isLightMode = document.documentElement.classList.contains("light");
    setIsLight(isLightMode);
  }, []);

  // Scroll listener for elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!communityRef.current?.contains(target)) {
        setCommunityDropdownOpen(false);
      }
      if (!profileRef.current?.contains(target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const primaryNavItems = [
    { label: "About", href: "/about" },
    { label: "Tracks", href: "/tracks" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
  ];

  const communityDropdownItems = [
    { label: "Projects Showcase", href: "/projects" },
    { label: "Challenges & Sprints", href: "/challenges" },
    { label: "Tech Blog", href: "/blog" },
    { label: "Community Gallery", href: "/gallery" },
    { label: "Code of Conduct", href: "/code-of-conduct" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-200 px-3 sm:px-6 pt-3 pb-2 ${
          isScrolled ? "bg-surface-lowest/80 backdrop-blur-xl border-b border-outline/50 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo & Chapter Title */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 py-1 shrink-0 select-none group"
            aria-label="AWS Student Builder Group HBTU Home"
          >
            <BrandLogo size="md" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-extrabold text-xs sm:text-sm text-on-background uppercase tracking-tight group-hover:text-primary-accent transition-colors leading-snug">
                AWS Student Builder Group
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-on-surface-variant leading-none">
                HBTU Kanpur Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Floating Navigation Pill (Exact Reference Pattern) */}
          <nav className="hidden xl:flex items-center gap-1 bg-surface-low/80 border border-outline/70 backdrop-blur-lg p-1.5 rounded-xl shadow-inner mx-auto">
            <Link
              href="/"
              className={`relative text-xs font-mono font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 select-none inline-flex items-center justify-center gap-1.5 leading-none ${
                pathname === "/"
                  ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                  : "text-on-surface-variant hover:text-on-background hover:bg-surface-container/50"
              }`}
            >
              Home
            </Link>

            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-xs font-mono font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 select-none inline-flex items-center justify-center gap-1.5 leading-none ${
                    isActive
                      ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                      : "text-on-surface-variant hover:text-on-background hover:bg-surface-container/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Community Dropdown for Additional Pages */}
            <div className="relative" ref={communityRef}>
              <button
                onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
                aria-expanded={communityDropdownOpen}
                aria-haspopup="true"
                className={`relative text-xs font-mono font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 select-none inline-flex items-center justify-center gap-1 leading-none ${
                  communityDropdownItems.some((i) => pathname === i.href)
                    ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                    : "text-on-surface-variant hover:text-on-background hover:bg-surface-container/50"
                }`}
              >
                <span>Community</span>
                <span className="material-symbols-outlined text-[14px]">
                  {communityDropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {communityDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-xl bg-surface-low border border-outline shadow-xl py-1 z-50 backdrop-blur-xl">
                  {communityDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCommunityDropdownOpen(false)}
                      className={`block px-4 py-2 font-mono text-xs font-semibold transition-colors ${
                        pathname === item.href
                          ? "text-primary-accent bg-primary-accent/10"
                          : "text-on-surface-variant hover:text-on-background hover:bg-surface-container"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/join"
              className={`relative text-xs font-mono font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 select-none inline-flex items-center justify-center gap-1.5 leading-none ${
                pathname === "/join"
                  ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                  : "text-on-surface-variant hover:text-on-background hover:bg-surface-container/50"
              }`}
            >
              Join
            </Link>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Chat Link */}
            <Link
              href="/chat"
              title="Community Assistant"
              aria-label="Community Assistant"
              className={`h-9 w-9 rounded-xl border border-outline/70 bg-surface-low flex items-center justify-center text-on-surface-variant hover:text-primary-accent hover:border-primary-accent/40 transition-colors ${
                pathname === "/chat" ? "text-primary-accent border-primary-accent" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to dark theme" : "Switch to light theme"}
              aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
              className="h-9 w-9 rounded-xl border border-outline/70 bg-surface-low text-on-surface-variant hover:text-primary-accent hover:border-primary-accent/40 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[19px]">
                {isLight ? "dark_mode" : "light_mode"}
              </span>
            </button>

            {/* User Profile or Join CTA */}
            {!loading && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  className="h-9 px-3.5 rounded-xl btn-3d-secondary font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">account_circle</span>
                  <span className="hidden md:inline">{userProfile?.name || user?.displayName || "Account"}</span>
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-low border border-outline shadow-xl py-1 z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 font-mono text-xs text-on-background hover:bg-surface-container"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 font-mono text-xs text-red-400 hover:bg-surface-container"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/join"
                className="hidden sm:inline-flex h-9 items-center justify-center px-4 rounded-xl btn-3d-aws font-mono text-[11px] font-bold uppercase tracking-wider text-black"
              >
                Join Community
              </Link>
            )}

            {/* Mobile Drawer Hamburger Trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open mobile navigation menu"
              className="xl:hidden h-9 w-9 rounded-xl border border-outline/70 bg-surface-low text-on-surface-variant hover:text-on-background flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-in Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        isLight={isLight}
        onToggleTheme={toggleTheme}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border-hairline bg-bg/90 px-4 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-3 transition-opacity active:opacity-80">
        <span className="material-symbols-outlined text-2xl text-accent">architecture</span>
        <span className="font-heading text-lg font-bold text-accent sm:text-xl">
          AWS SBG HBTU
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden items-center gap-8 md:flex">
        <Link
          href="/about"
          className="flex h-16 items-center text-sm font-medium text-text transition-colors hover:text-accent"
        >
          About
        </Link>
        <Link
          href="/tracks"
          className="flex h-16 items-center text-sm font-medium text-text transition-colors hover:text-accent"
        >
          Tracks
        </Link>
        <Link
          href="/events"
          className="flex h-16 items-center text-sm font-medium text-text transition-colors hover:text-accent"
        >
          Events
        </Link>
        <Link
          href="/team"
          className="flex h-16 items-center text-sm font-medium text-text transition-colors hover:text-accent"
        >
          Team
        </Link>
        <Link
          href="/join"
          className="flex h-16 items-center text-sm font-medium text-text transition-colors hover:text-accent"
        >
          Join
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/notifications" className="flex items-center text-text hover:text-accent transition-colors" title="Announcements">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </Link>
        {!loading && user ? (
          <>
            <Link href="/dashboard" className="hidden text-sm font-medium text-text hover:text-accent sm:block">
              Dashboard
            </Link>
            <Button onClick={handleLogout} variant="secondary" className="text-xs font-bold sm:text-sm">
              Log Out
            </Button>
          </>
        ) : (
          <Button as={Link} href="/login" variant="primary" className="text-xs font-bold sm:text-sm">
            Core Login
          </Button>
        )}
      </div>
    </header>
  );
}

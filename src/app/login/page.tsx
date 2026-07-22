"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { toast } from "sonner";

/**
 * Email/password login page.
 *
 * Signs the user in via Firebase Auth and redirects to the dashboard on
 * success (or immediately if already signed in). Shows inline and toast
 * feedback for failed attempts.
 */
export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect
  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);
    setSuccess(false);
    setError("");

    try {
      if (!auth) throw new Error("Firebase Auth is not initialized.");
      await signInWithEmailAndPassword(auth, email, password);

      setSuccess(true);
      toast.success("Successfully signed in!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password.");
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 overflow-hidden">
      {/* Soft accent glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative max-w-md w-full bg-bg-card border border-border-hairline rounded-lg shadow-xl shadow-accent/5 overflow-hidden">
        {/* Pixel accent strip echoing the brand logo */}
        <div aria-hidden className="flex h-1.5">
          <div className="flex-1 bg-accent" />
          <div className="w-10 bg-accent/60" />
          <div className="w-10 bg-accent/30" />
          <div className="w-10 bg-accent/10" />
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-baseline gap-2 font-heading">
              <span className="text-3xl font-bold tracking-tight text-text">aws</span>
              <span className="text-3xl font-bold tracking-tight text-accent">sbg</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-text mb-2">Welcome Builder!</h1>
            <p className="text-sm text-text-muted leading-relaxed">
              Sign in to join the community, access exclusive events, and start building.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="builder@hbtu.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-11"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 font-semibold shadow-lg shadow-accent/25"
              disabled={loadingEmail}
              isLoading={loadingEmail}
              isSuccess={success}
            >
              {success ? "Welcome!" : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-hairline text-center text-sm text-text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

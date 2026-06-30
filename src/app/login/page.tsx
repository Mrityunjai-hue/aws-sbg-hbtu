"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { toast } from "sonner";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
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

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setSuccess(false);
    setError("");
    
    try {
      if (!auth) throw new Error("Firebase Auth is not initialized.");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      // Check if user exists in db
      const userRef = doc(db!, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile
        await setDoc(userRef, {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "member", // Default role
          createdAt: serverTimestamp(),
        });
      }
      
      setSuccess(true);
      toast.success("Successfully signed in!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Failed to sign in with Google.");
      toast.error("Failed to sign in with Google.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-20">
      <div className="max-w-md w-full p-8 bg-bg-card border border-border-hairline rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <span className="font-heading text-3xl font-bold tracking-tight text-white">aws</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text mb-2">Welcome Builder!</h1>
          <p className="text-text-muted">Sign in to join the community, access exclusive events, and start building.</p>
        </div>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-text-muted">Email</label>
            <Input 
              type="email" 
              placeholder="builder@hbtu.ac.in" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-text-muted">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full h-11" 
            disabled={loadingEmail || loadingGoogle}
            isLoading={loadingEmail}
            isSuccess={success && !loadingGoogle}
          >
            {(success && !loadingGoogle) ? "Welcome!" : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-hairline"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-bg-card px-2 text-text-muted">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button"
          variant="secondary"
          onClick={handleGoogleLogin} 
          className="w-full h-11"
          disabled={loadingEmail || loadingGoogle}
          isLoading={loadingGoogle}
          isSuccess={success && loadingGoogle}
        >
          {success && loadingGoogle ? "Welcome!" : "Google"}
        </Button>

        <div className="mt-6 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

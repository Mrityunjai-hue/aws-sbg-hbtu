"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect
  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setSuccess(false);
    try {
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
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-8 bg-bg-card border border-border-hairline rounded-lg text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <span className="font-heading text-3xl font-bold tracking-tight text-white">aws</span>
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Welcome Builder!</h1>
        <p className="text-text-muted mb-8">Sign in to join the community, access exclusive events, and start building.</p>
        
        <Button 
          onClick={handleGoogleLogin} 
          className="w-full h-12 text-lg"
          isLoading={loading}
          isSuccess={success}
        >
          {success ? "Welcome!" : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}

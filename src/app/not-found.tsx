import React from "react";
import Link from "next/link";
import { Badge, Card } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="site-container py-20 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center">
      <Card variant="terminal" className="max-w-md w-full p-8 sm:p-10 space-y-6">
        <Badge variant="purple" size="sm" className="font-mono">
          ERROR 404
        </Badge>

        <div className="font-mono text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-aws">
          404
        </div>

        <div className="space-y-2">
          <h1 className="font-sans text-2xl font-bold text-text">
            Page Not Found
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">
            The requested cloud resource or route does not exist in this deployment.
          </p>
        </div>

        <div className="font-mono text-[11px] text-text-muted bg-surface-elevated/60 p-3 rounded-lg border border-border-hairline text-left">
          <span className="text-accent">$</span> aws s3 ls /current-route
          <br />
          <span className="text-red-400">NoSuchKey: The specified key does not exist.</span>
        </div>

        <div>
          <Link
            href="/"
            className="btn-3d-aws inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm"
          >
            <span>Return to Home Page</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Card>
    </div>
  );
}

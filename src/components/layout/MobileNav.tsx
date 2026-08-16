"use client";

import Link from "next/link";
import { useChatNotification } from "@/lib/contexts/ChatNotificationContext";

/**
 * Fixed bottom tab bar for mobile (hidden at md and up).
 *
 * Provides quick links to the main sections with evenly-spaced items,
 * safe-area inset padding for gesture-bar phones, and an unread badge
 * on the chat tab.
 */
export function MobileNav() {
  const { hasUnread } = useChatNotification();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-border-hairline bg-bg-card/95 backdrop-blur-md px-1 sm:px-3 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden overflow-x-hidden">
      <Link
        href="/about"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">info</span>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">About</span>
      </Link>
      <Link
        href="/tracks"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">terminal</span>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">Tracks</span>
      </Link>
      <Link
        href="/events"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">event</span>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">Events</span>
      </Link>
      <Link
        href="/team"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">groups</span>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">Team</span>
      </Link>
      <Link
        href="/join"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <span className="material-symbols-outlined text-[20px] sm:text-[22px]">person_add</span>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">Join</span>
      </Link>
      <Link
        href="/chat"
        className="flex flex-1 min-w-0 flex-col items-center justify-center rounded-full px-0.5 py-1 text-text-muted transition-colors hover:text-accent"
      >
        <div className="relative">
          <span className="material-symbols-outlined text-[20px] sm:text-[22px]">chat</span>
          {hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-bg-card" />
          )}
        </div>
        <span className="text-[9px] sm:text-[10px] font-medium truncate leading-tight">Chat</span>
      </Link>
    </nav>
  );
}

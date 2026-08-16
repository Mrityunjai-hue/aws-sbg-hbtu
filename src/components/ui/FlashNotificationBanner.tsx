"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents, EventRecord } from "@/lib/services/events";
import { fetchNotifications, NotificationRecord } from "@/lib/services/notifications";
import { Timestamp } from "firebase/firestore";

interface FlashAlert {
  id: string;
  title: string;
  type: "event" | "announcement";
  link: string;
}

export function FlashNotificationBanner() {
  const [alert, setAlert] = useState<FlashAlert | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function checkLatestUpdates() {
      try {
        const [events, notifications] = await Promise.all([
          fetchEvents(1),
          fetchNotifications(),
        ]);

        let latestAlert: FlashAlert | null = null;
        let latestTime = 0;

        if (events.length > 0) {
          const ev = events[0];
          const evTime = ev.date instanceof Timestamp ? ev.date.toMillis() : new Date(ev.date).getTime();
          if (!isNaN(evTime) && evTime > latestTime) {
            latestTime = evTime;
            latestAlert = {
              id: `ev-${ev.id}`,
              title: `Upcoming Event: ${ev.title}`,
              type: "event",
              link: "/events",
            };
          }
        }

        if (notifications.length > 0) {
          const notif = notifications[0];
          const notifTime = notif.createdAt ? notif.createdAt.toMillis() : 0;
          if (notifTime > latestTime) {
            latestTime = notifTime;
            latestAlert = {
              id: `notif-${notif.id}`,
              title: `Announcement: ${notif.title}`,
              type: "announcement",
              link: "/notifications",
            };
          }
        }

        if (latestAlert) {
          const dismissedKey = `dismissed_flash_${latestAlert.id}`;
          const isDismissed = sessionStorage.getItem(dismissedKey);
          if (!isDismissed) {
            setAlert(latestAlert);
            setVisible(true);
          }
        }
      } catch (err) {
        console.error("Failed to load flash alert:", err);
      }
    }

    checkLatestUpdates();
  }, []);

  useEffect(() => {
    if (!visible || !alert) return;

    // Auto-vanish after 6 seconds so it doesn't irritate viewers
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [visible, alert]);

  const handleDismiss = () => {
    if (alert) {
      sessionStorage.setItem(`dismissed_flash_${alert.id}`, "true");
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && alert && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="fixed top-20 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50 pointer-events-auto flex justify-center max-w-2xl mx-auto"
        >
          <div className="relative overflow-hidden flex items-center justify-between gap-2.5 sm:gap-3.5 rounded-full border border-accent/40 bg-[#0d1527]/95 px-3.5 sm:px-5 py-2.5 shadow-[0_4px_24px_rgba(255,153,0,0.22)] backdrop-blur-xl text-text w-full sm:w-auto max-w-full">
            {/* Live Glowing Pulse Beacon */}
            <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </div>

            {/* Clickable Content Link */}
            <Link
              href={alert.link}
              onClick={handleDismiss}
              className="flex flex-1 sm:flex-none items-center gap-2 min-w-0 group"
            >
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-accent tracking-wider uppercase shrink-0 bg-accent/15 px-2 py-0.5 rounded-full border border-accent/30">
                {alert.type === "event" ? "EVENT" : "ANNOUNCEMENT"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-text truncate group-hover:underline max-w-[220px] sm:max-w-[420px]">
                {alert.title.replace(/^(Upcoming Event:|Announcement:)\s*/, "")}
              </span>
              <span className="material-symbols-outlined text-[15px] text-accent group-hover:translate-x-1 transition-all shrink-0">
                arrow_forward
              </span>
            </Link>

            {/* Manual Dismiss Button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss notification"
              className="ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-white/10 hover:text-text transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>

            {/* Shrinking Micro Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-accent via-purple-400 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

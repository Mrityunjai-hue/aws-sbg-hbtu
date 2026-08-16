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
      handleDismiss();
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
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -25, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-18 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-md pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-[#141d2f]/95 p-3.5 shadow-2xl backdrop-blur-md text-text">
            <Link
              href={alert.link}
              onClick={handleDismiss}
              className="flex flex-1 items-center gap-2.5 min-w-0 group"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <span className="material-symbols-outlined text-[16px]">
                  {alert.type === "event" ? "event" : "campaign"}
                </span>
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {alert.type === "event" ? "New Event" : "New Announcement"}
                </span>
                <p className="text-xs font-semibold text-text truncate group-hover:underline">
                  {alert.title}
                </p>
              </div>
            </Link>

            <button
              onClick={handleDismiss}
              aria-label="Dismiss alert"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-white/10 hover:text-text transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

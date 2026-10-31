"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents } from "@/lib/services/events";
import { fetchNotifications } from "@/lib/services/notifications";
import { ACTIVE_14DAY_CHALLENGE } from "@/data/challenges";
import { Timestamp } from "firebase/firestore";

interface FlashAlert {
  id: string;
  title: string;
  type: "event" | "announcement" | "challenge";
  link: string;
}

export function FlashNotificationBanner() {
  const [alert, setAlert] = useState<FlashAlert | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function checkLatestUpdates() {
      try {
        const [events, notifications] = await Promise.all([
          fetchEvents(5),
          fetchNotifications(),
        ]);

        let latestAlert: FlashAlert | null = null;
        let latestTime = 0;
        const now = Date.now();

        // 1. FILTER: Strictly ACTIVE or UPCOMING events only (never past/commenced events)
        const upcomingEvents = events.filter((ev) => {
          const evTime =
            ev.date instanceof Timestamp
              ? ev.date.toMillis()
              : new Date(ev.date).getTime();
          return !isNaN(evTime) && evTime >= now;
        });

        if (upcomingEvents.length > 0) {
          const nextEv = upcomingEvents[0];
          const evTime =
            nextEv.date instanceof Timestamp
              ? nextEv.date.toMillis()
              : new Date(nextEv.date).getTime();
          latestTime = evTime;
          latestAlert = {
            id: `ev-${nextEv.id}`,
            title: `Upcoming Workshop: ${nextEv.title}`,
            type: "event",
            link: "/events",
          };
        }

        // 2. Announcements
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

        // 3. Challenge Fallback if no imminent event
        if (!latestAlert) {
          if (ACTIVE_14DAY_CHALLENGE.status === "ACTIVE") {
            latestAlert = {
              id: `chal-${ACTIVE_14DAY_CHALLENGE.id}`,
              title: `Active Sprint: 14-Day AWS Challenge is Live · Verify Modules Daily!`,
              type: "challenge",
              link: "/challenges",
            };
          } else if (ACTIVE_14DAY_CHALLENGE.status === "COMPLETED") {
            latestAlert = {
              id: `chal-${ACTIVE_14DAY_CHALLENGE.id}-concluded`,
              title: `14-Day AWS Challenge Concluded: Official Standings Locked & Podium Winners Finalized!`,
              type: "challenge",
              link: "/challenges",
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

    // Auto-vanish after 7 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);

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
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="fixed top-20 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50 pointer-events-auto flex justify-center max-w-2xl mx-auto"
        >
          {/* Theme-Adaptive Glassmorphic Pill */}
          <div className="relative overflow-hidden flex items-center justify-between gap-2.5 sm:gap-3.5 rounded-full border border-primary-accent/40 bg-white/95 dark:bg-[#070e0a]/95 px-3.5 sm:px-5 py-2.5 shadow-[0_8px_30px_rgba(16,185,129,0.25)] backdrop-blur-xl text-on-background w-full sm:w-auto max-w-full">
            {/* Live Glowing Pulse Beacon */}
            <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-accent" />
            </div>

            {/* Clickable Content Link */}
            <Link
              href={alert.link}
              onClick={handleDismiss}
              className="flex flex-1 sm:flex-none items-center gap-2 min-w-0 group"
            >
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-primary-accent tracking-wider uppercase shrink-0 bg-primary-accent/15 px-2 py-0.5 rounded-full border border-primary-accent/30">
                {alert.type === "event"
                  ? "UPCOMING EVENT"
                  : alert.type === "challenge"
                  ? "LIVE CHALLENGE"
                  : "ANNOUNCEMENT"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-on-background truncate group-hover:text-primary-accent transition-colors max-w-[200px] sm:max-w-[400px]">
                {alert.title.replace(/^(Upcoming (Event|Workshop):|Announcement:|Active Sprint:)\s*/, "")}
              </span>
              <span className="material-symbols-outlined text-[15px] text-primary-accent group-hover:translate-x-1 transition-transform shrink-0">
                arrow_forward
              </span>
            </Link>

            {/* Manual Dismiss Button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss notification"
              className="ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-primary-accent/10 hover:text-on-background transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>

            {/* Shrinking Micro Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 7, ease: "linear" }}
              className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-primary-accent via-emerald-400 to-aws-orange rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

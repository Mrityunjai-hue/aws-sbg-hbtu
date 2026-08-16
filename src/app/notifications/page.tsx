"use client";

import { useEffect, useState } from "react";
import { fetchNotifications, NotificationRecord } from "@/lib/services/notifications";
import { Card } from "@/components/ui";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

export default function NotificationsPage() {
  const { userProfile } = useAuth();
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
    }
    loadNotifications();
  }, []);

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-container">
        <div className="mb-12">
          <h1 className="font-heading text-4xl font-bold text-text">Notifications</h1>
          <p className="text-text-muted mt-2">Community announcements and updates.</p>
        </div>

        {loading ? (
          <div className="flex animate-pulse flex-col gap-4">
            <div className="h-24 w-full rounded-lg bg-bg-card" />
            <div className="h-24 w-full rounded-lg bg-bg-card" />
          </div>
        ) : notifications.length === 0 ? (
          <Card className="p-8 text-center text-text-muted">
            No recent announcements. Check back later!
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => {
              const dateObj = notif.createdAt ? notif.createdAt.toDate() : null;
              const dateString = dateObj 
                ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
                : "";

              return (
                <Card key={notif.id} className="p-6 transition-colors hover:border-border-hairline/80">
                  <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading text-xl font-bold text-text">{notif.title}</h3>
                        {userProfile?.role === "admin" && (
                          <Link
                            href={`/admin/edit-notification/${notif.id}`}
                            className="rounded px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/50 hover:bg-accent/10 transition-colors"
                          >
                            Edit
                          </Link>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-text-muted whitespace-pre-line">{notif.message}</p>
                    </div>
                    {dateString && (
                      <span className="mt-4 text-xs font-medium text-text-muted md:mt-0 whitespace-nowrap">
                        {dateString}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

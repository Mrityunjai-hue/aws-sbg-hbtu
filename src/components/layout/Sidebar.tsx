"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  authRequired?: boolean;
}

interface NavGroup {
  title: string;
  icon?: string;
  items: NavItem[];
}

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navGroups: NavGroup[] = [
    {
      title: "",
      items: [
        { label: "Home", href: "/", icon: "home" },
        { label: "Dashboard", href: "/dashboard", icon: "dashboard", authRequired: true },
      ],
    },
    {
      title: "Learn",
      icon: "menu_book",
      items: [
        { label: "About", href: "/about" },
        { label: "Tracks", href: "/tracks" },
      ],
    },
    {
      title: "Connect",
      icon: "group",
      items: [
        { label: "Events", href: "/events" },
        { label: "Announcements", href: "/notifications" },
      ],
    },
    {
      title: "Community",
      icon: "diversity_3",
      items: [
        { label: "Heroes", href: "/heroes" },
        { label: "Join Us", href: "/join" },
        { label: "Global Chat", href: "/chat", authRequired: true },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border-hairline bg-bg pt-16 hidden md:block overflow-y-auto">
      <div className="flex flex-col py-6">
        <div className="px-6 mb-6">
          <h2 className="font-heading text-xl font-bold tracking-tight text-text">Builder Center</h2>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          {navGroups.map((group, idx) => {
            const visibleItems = group.items.filter(
              (item) => !item.authRequired || (item.authRequired && user)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={idx} className="flex flex-col">
                {group.title && (
                  <div className="flex items-center gap-3 px-6 py-2 text-sm font-semibold text-text hover:bg-white/5 cursor-pointer transition-colors">
                    {group.icon && <span className="material-symbols-outlined text-[20px] text-text-muted">{group.icon}</span>}
                    {group.title}
                    <span className="material-symbols-outlined ml-auto text-[18px] text-text-muted">expand_more</span>
                  </div>
                )}
                <ul className="flex flex-col">
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    // If it's a root item (like Home) we show icon and less indent. If it's under a group, we indent more and show no icon.
                    const isRoot = !group.title;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 py-2.5 text-sm font-semibold transition-colors ${
                            isRoot ? "px-6" : "pl-[3.25rem] pr-6"
                          } ${
                            isActive
                              ? "bg-accent text-[#0F1420]"
                              : "text-text hover:bg-white/5"
                          }`}
                        >
                          {item.icon && <span className="material-symbols-outlined text-[20px] text-text-muted">{item.icon}</span>}
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

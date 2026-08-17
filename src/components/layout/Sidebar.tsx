"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useChatNotification } from "@/lib/contexts/ChatNotificationContext";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { MeetupIcon, LinkedInIcon, WhatsAppIcon, GitHubIcon } from "@/components/ui/SocialIcons";

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

/**
 * Fixed left sidebar navigation (desktop only, hidden below md).
 */
export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { hasUnread } = useChatNotification();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
        { label: "Core Team", href: "/team" },
        { label: "Join Us", href: "/join" },
        { label: "Global Chat", href: "/chat", authRequired: true },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border-hairline bg-bg pt-16 hidden md:flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col py-6">
        <div className="px-6 mb-4">
          <h2 className="font-heading text-xl font-bold tracking-tight text-text">Builder Center</h2>
        </div>

        <nav className="flex flex-col gap-2 mt-2">
          {navGroups.map((group, idx) => {
            const visibleItems = group.items.filter(
              (item) => !item.authRequired || (item.authRequired && user)
            );

            if (visibleItems.length === 0) return null;

            const isCollapsed = group.title ? collapsedGroups[group.title] : false;

            return (
              <div key={idx} className="flex flex-col">
                {group.title && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    aria-expanded={!isCollapsed}
                    className="flex w-full items-center gap-3 px-6 py-2 text-sm font-semibold text-text hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    {group.icon && <span className="material-symbols-outlined text-[20px] text-text-muted">{group.icon}</span>}
                    {group.title}
                    <span
                      className={`material-symbols-outlined ml-auto text-[18px] text-text-muted transition-transform ${
                        isCollapsed ? "-rotate-90" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                )}
                {!isCollapsed && (
                  <ul className="flex flex-col">
                    {visibleItems.map((item) => {
                      const isActive = pathname === item.href;
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
                            {item.href === "/chat" && hasUnread && (
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-auto" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Social Links Sidebar Footer */}
      <div className="px-6 py-4 border-t border-border-hairline/60 bg-bg-card/50">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2.5">Official Socials</p>
        <div className="grid grid-cols-4 gap-2">
          <a
            href={SOCIAL_LINKS.meetup.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Meetup Group"
            className="flex h-9 w-9 items-center justify-center rounded border border-border-hairline bg-bg text-[#ED1C40] hover:bg-[#ED1C40]/10 hover:border-[#ED1C40] transition-colors"
          >
            <MeetupIcon className="w-4 h-4" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Page"
            className="flex h-9 w-9 items-center justify-center rounded border border-border-hairline bg-bg text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Community"
            className="flex h-9 w-9 items-center justify-center rounded border border-border-hairline bg-bg text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Org"
            className="flex h-9 w-9 items-center justify-center rounded border border-border-hairline bg-bg text-text-muted hover:text-text hover:bg-white/10 hover:border-white transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}

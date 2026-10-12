"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLight: boolean;
  onToggleTheme: () => void;
}

export function MobileDrawer({ isOpen, onClose, isLight, onToggleTheme }: MobileDrawerProps) {
  const pathname = usePathname();
  const prevPathnameRef = React.useRef(pathname);

  // Close drawer on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "Home", href: "/", tag: "01" },
    { label: "About", href: "/about", tag: "02" },
    { label: "Tracks", href: "/tracks", tag: "03" },
    { label: "Events & Workshops", href: "/events", tag: "04" },
    { label: "Core Team", href: "/team", tag: "05" },
    { label: "Join the Group", href: "/join", tag: "06" },
    { label: "Community Chat", href: "/chat", tag: "07" },
    { label: "Projects", href: "/projects", tag: "08" },
    { label: "Challenges", href: "/challenges", tag: "09" },
    { label: "Tech Blog", href: "/blog", tag: "10" },
    { label: "Gallery", href: "/gallery", tag: "11" },
    { label: "Contact", href: "/contact", tag: "12" },
    { label: "Code of Conduct", href: "/code-of-conduct", tag: "13" },
  ];

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-84 max-w-sm bg-surface-lowest border-l border-outline shadow-2xl flex flex-col justify-between overflow-y-auto p-5 transition-transform">
        {/* Top Header inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-outline">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                className="h-8 w-8 rounded-lg border border-outline bg-surface-low text-on-surface-variant flex items-center justify-center transition-colors hover:text-primary-accent"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isLight ? "dark_mode" : "light_mode"}
                </span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="h-8 w-8 rounded-lg border border-outline bg-surface-low text-on-surface-variant flex items-center justify-center transition-colors hover:text-on-background"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Navigation Links List */}
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-primary-accent/15 text-primary-accent border border-primary-accent/30"
                      : "text-on-surface-variant hover:text-on-background hover:bg-surface-low"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-on-surface-variant/60 font-mono">
                    {item.tag}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-4 border-t border-outline flex flex-col gap-3">
          <Link
            href="/join"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl btn-3d-primary font-mono text-xs font-extrabold uppercase tracking-wider text-center text-white"
          >
            Join the Community →
          </Link>
          <div className="text-[10px] font-mono text-on-surface-variant text-center">
            Harcourt Butler Technical University, Kanpur
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-border-hairline bg-bg-card px-2 py-2 md:hidden overflow-x-hidden">
      <Link
        href="/about"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">info</span>
        <span className="text-[10px] font-medium">About</span>
      </Link>
      <Link
        href="/tracks"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">terminal</span>
        <span className="text-[10px] font-medium">Tracks</span>
      </Link>
      <Link
        href="/events"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">event</span>
        <span className="text-[10px] font-medium">Events</span>
      </Link>
      <Link
        href="/heroes"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">groups</span>
        <span className="text-[10px] font-medium">Heroes</span>
      </Link>
      <Link
        href="/join"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">person_add</span>
        <span className="text-[10px] font-medium">Join</span>
      </Link>
      <Link
        href="/chat"
        className="flex flex-col items-center justify-center rounded-full px-2 py-1 text-text-muted transition-transform duration-150 active:scale-95 hover:text-accent"
      >
        <span className="material-symbols-outlined text-[24px]">chat</span>
        <span className="text-[10px] font-medium">Chat</span>
      </Link>
    </nav>
  );
}

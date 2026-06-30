import { EventsList } from "@/components/features/EventsList";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="px-8 py-12 md:py-20 mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs font-semibold text-text-muted mb-8 space-x-2">
        <Link href="/" className="hover:text-text hover:underline transition-all">AWS Builder Center</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span>Connect</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-text">Events</span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 border-b border-border-hairline pb-20">
        <div className="flex-1">
          <h1 className="mb-4 font-heading text-4xl lg:text-5xl font-bold text-text">Events</h1>
          <p className="text-sm text-text-muted max-w-md">
            Mark your calendars, meet cloud builders, grow your network.
          </p>
        </div>

        {/* Small Pixel Graphic */}
        <div className="flex-1 flex justify-start lg:justify-end">
          <div className="grid grid-cols-5 grid-rows-3 gap-0">
            {/* Row 1 */}
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12 bg-pink-200"></div>
            <div className="w-12 h-12 bg-pink-200"></div>
            <div className="w-12 h-12 bg-blue-300"></div>
            
            {/* Row 2 */}
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12 bg-pink-200"></div>
            <div className="w-12 h-12 bg-pink-200"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            
            {/* Row 3 */}
            <div className="w-12 h-12 bg-rose-400"></div>
            <div className="w-12 h-12 bg-rose-400"></div>
            <div className="w-12 h-12 bg-purple-300"></div>
            <div className="w-12 h-12 bg-purple-300"></div>
            <div className="w-12 h-12"></div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text mb-6">Community events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Static informational cards to match the design */}
          <div className="bg-[#141d2f] border border-border-hairline p-6 hover:border-accent/50 transition-colors">
            <h3 className="font-heading font-bold text-lg mb-3">AWS Builder Loft</h3>
            <p className="text-sm text-text-muted mb-6">Meet and learn with other builders at industry-expert sessions, hands-on workshops, and community-driven events.</p>
            <Link href="#" className="text-sm font-semibold text-text hover:underline flex items-center gap-1">
              Find upcoming events <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          
          <div className="bg-[#141d2f] border border-border-hairline p-6 hover:border-accent/50 transition-colors">
            <h3 className="font-heading font-bold text-lg mb-3">AWS User Group events</h3>
            <p className="text-sm text-text-muted mb-6">Technical sessions and workshops for builders to learn about AWS services and best practices from AWS Partners and experts.</p>
            <Link href="#" className="text-sm font-semibold text-text hover:underline flex items-center gap-1">
              Find upcoming events <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-[#141d2f] border border-border-hairline p-6 hover:border-accent/50 transition-colors">
            <h3 className="font-heading font-bold text-lg mb-3">AWS Student Builder events</h3>
            <p className="text-sm text-text-muted mb-6">Student-led events on campus that offer ways to explore cloud technology, build innovative projects, and grow.</p>
            <Link href="#" className="text-sm font-semibold text-text hover:underline flex items-center gap-1">
              Find upcoming events <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-bold text-text mb-6">HBTU Upcoming Events</h2>
        <EventsList />
      </div>

    </div>
  );
}

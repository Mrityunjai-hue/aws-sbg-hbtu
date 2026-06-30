import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col px-8 py-12 md:py-20 mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 mb-24">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold leading-[1.1] text-text mb-6">
            Your ideas.<br />
            Your community.<br />
            Your AWS SBG.
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-xl">
            Connect with builders who understand your journey. Explore cloud technology, build innovative projects, and grow your technical skills. Your cloud journey starts here at HBTU.
          </p>
          <div>
            <Link href="/join" className="inline-flex items-center justify-center rounded px-6 py-3 font-bold bg-white text-[#0F1420] hover:bg-gray-200 transition-colors">
              Join the community
            </Link>
          </div>
        </div>

        {/* Pixel Art Graphic */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="grid grid-cols-6 grid-rows-4 gap-0 border border-border-hairline/50 p-6 opacity-90" style={{ backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            {/* Row 1 */}
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            {/* Row 2 */}
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="w-10 h-10"></div>
            {/* Row 3 */}
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-700"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800"></div>
            <div className="w-10 h-10"></div>
            {/* Row 4 */}
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-purple-900"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Spotlight & Wishlist */}
      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* Main Column */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold mb-6">Learning Tracks</h2>
          <div className="flex border-b border-border-hairline mb-6">
            <button className="px-4 py-2 border-b-2 border-accent text-accent font-semibold text-sm">Cloud Foundations</button>
            <button className="px-4 py-2 border-b-2 border-transparent text-text-muted hover:text-text font-semibold text-sm">Serverless</button>
            <button className="px-4 py-2 border-b-2 border-transparent text-text-muted hover:text-text font-semibold text-sm">Machine Learning</button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#141d2f] border border-border-hairline overflow-hidden hover:border-accent/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-accent">cloud</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold mb-2">Core Infrastructure</h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">Master the core building blocks of AWS infrastructure, security, and networking.</p>
                <div className="flex items-center text-xs text-text-muted">
                  <span className="material-symbols-outlined text-[16px] mr-1">person</span> Beginner Friendly
                </div>
              </div>
            </div>
            
            <div className="bg-[#141d2f] border border-border-hairline overflow-hidden hover:border-accent/50 transition-colors">
              <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-accent">security</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold mb-2">Identity & Access</h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">Learn how to secure your AWS environment with IAM policies and roles.</p>
                <div className="flex items-center text-xs text-text-muted">
                  <span className="material-symbols-outlined text-[16px] mr-1">person</span> Intermediate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-border-hairline lg:pl-12 pt-12 lg:pt-0">
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-sm text-text-muted mb-6">
              Mark your calendars, meet cloud builders, grow your network.
            </p>
            
            <div className="bg-[#141d2f] border border-border-hairline p-6 text-center">
              <span className="material-symbols-outlined text-4xl text-accent mb-4">event</span>
              <h3 className="font-heading font-bold mb-2">No upcoming events</h3>
              <p className="text-sm text-text-muted mb-4">Check back later for new workshops and meetups.</p>
              <Link href="/events" className="text-sm text-accent hover:underline flex items-center justify-center gap-1">
                View past events <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h2 className="font-heading text-2xl font-bold mb-4">Trending topics</h2>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="block hover:bg-[#141d2f] p-2 -mx-2 rounded transition-colors">
                  <span className="text-xs text-accent uppercase font-bold tracking-wider mb-1 block">AWS re:Invent</span>
                  <span className="text-sm font-semibold text-text">Recap of the top announcements from re:Invent 2025</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="block hover:bg-[#141d2f] p-2 -mx-2 rounded transition-colors">
                  <span className="text-xs text-accent uppercase font-bold tracking-wider mb-1 block">Generative AI</span>
                  <span className="text-sm font-semibold text-text">Building your first Bedrock application</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="block hover:bg-[#141d2f] p-2 -mx-2 rounded transition-colors">
                  <span className="text-xs text-accent uppercase font-bold tracking-wider mb-1 block">Serverless</span>
                  <span className="text-sm font-semibold text-text">Optimizing AWS Lambda cold starts</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

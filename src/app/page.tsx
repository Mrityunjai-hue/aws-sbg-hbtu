import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { 
  MeetupIcon, 
  LinkedInIcon, 
  WhatsAppIcon, 
  InstagramIcon, 
  GitHubIcon, 
  TwitterIcon 
} from "@/components/ui/SocialIcons";

export default function HomePage() {
  return (
    <div className="flex flex-col px-4 sm:px-8 py-8 md:py-20 mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-24 mb-16 md:mb-24">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-sans text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.15] text-text mb-4 sm:mb-6">
            Your ideas.<br />
            Your community.<br />
            Your AWS SBG.
          </h1>
          <p className="text-base sm:text-lg text-text-muted mb-6 sm:mb-8 max-w-xl">
            Connect with builders who understand your journey. Explore cloud technology, build innovative projects, and grow your technical skills. Your cloud journey starts here at HBTU.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/join" className="inline-flex items-center justify-center rounded px-6 py-3 font-bold bg-white text-[#0F1420] hover:bg-gray-200 transition-colors w-full sm:w-auto">
              Join the community
            </Link>
            <a 
              href={SOCIAL_LINKS.meetup.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded px-5 py-3 font-semibold border border-border-hairline bg-bg-card text-text hover:border-[#ED1C40] hover:text-[#ED1C40] transition-colors w-full sm:w-auto justify-center"
            >
              <MeetupIcon className="w-5 h-5 text-[#ED1C40]" />
              <span>Meetup Group</span>
            </a>
          </div>
        </div>

        {/* Pixel Art Graphic */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="grid grid-cols-6 grid-rows-4 gap-0 border border-border-hairline/50 p-3 sm:p-6 opacity-90" style={{ backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            {/* Row 1 */}
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-purple-500"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            {/* Row 2 */}
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-500"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-500"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            {/* Row 3 */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-pink-600"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-600 to-purple-600"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-blue-700"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            {/* Row 4 */}
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-700 to-purple-900"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10"></div>
          </div>
        </div>
      </section>

      {/* Social Platforms Highlight Section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text mb-3">Connect Across Our Platforms</h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            Stay plugged in with our latest meetups, professional updates, project repositories, and student discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Meetup Card */}
          <a
            href={SOCIAL_LINKS.meetup.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-xl border border-border-hairline bg-bg-card hover:border-[#ED1C40] transition-all hover:-translate-y-1 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#ED1C40]/10 flex items-center justify-center text-[#ED1C40] group-hover:scale-110 transition-transform">
                <MeetupIcon className="w-6 h-6" />
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-[#ED1C40] transition-colors">open_in_new</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-text mb-1 group-hover:text-[#ED1C40] transition-colors">Meetup Group</h3>
            <p className="text-xs text-text-muted leading-relaxed flex-1">
              RSVP to upcoming cloud workshops, speaker sessions, and community meetups.
            </p>
            <div className="mt-4 pt-3 border-t border-border-hairline/40 text-xs font-semibold text-[#ED1C40]">
              Join Meetup →
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-xl border border-border-hairline bg-bg-card hover:border-[#0A66C2] transition-all hover:-translate-y-1 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-6 h-6" />
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-[#0A66C2] transition-colors">open_in_new</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-text mb-1 group-hover:text-[#0A66C2] transition-colors">LinkedIn Company Page</h3>
            <p className="text-xs text-text-muted leading-relaxed flex-1">
              Follow official announcements, career opportunities, and member achievements.
            </p>
            <div className="mt-4 pt-3 border-t border-border-hairline/40 text-xs font-semibold text-[#0A66C2]">
              Follow LinkedIn →
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-xl border border-border-hairline bg-bg-card hover:border-[#25D366] transition-all hover:-translate-y-1 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-[#25D366] transition-colors">open_in_new</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-text mb-1 group-hover:text-[#25D366] transition-colors">WhatsApp Community</h3>
            <p className="text-xs text-text-muted leading-relaxed flex-1">
              Chat directly with members, share quick doubts, and get real-time alerts.
            </p>
            <div className="mt-4 pt-3 border-t border-border-hairline/40 text-xs font-semibold text-[#25D366]">
              Join Chat →
            </div>
          </a>

          {/* Instagram / GitHub Combo Card */}
          <a
            href={SOCIAL_LINKS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-xl border border-border-hairline bg-bg-card hover:border-[#E4405F] transition-all hover:-translate-y-1 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F] group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-[#E4405F] transition-colors">open_in_new</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-text mb-1 group-hover:text-[#E4405F] transition-colors">Instagram Spotlights</h3>
            <p className="text-xs text-text-muted leading-relaxed flex-1">
              Catch behind-the-scenes moments, event reels, student features, and stories.
            </p>
            <div className="mt-4 pt-3 border-t border-border-hairline/40 text-xs font-semibold text-[#E4405F]">
              Follow @aws_sbg_hbtu →
            </div>
          </a>
        </div>
      </section>

      {/* Two Column Layout: About & FAQs */}
      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* Main Column: About */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold mb-6 text-text">About the program</h2>
          <div className="text-text-muted space-y-6 text-base leading-relaxed">
            <p>
              The AWS Student Builder Group at HBTU is a vibrant, student-led community on campus. Students come together to explore cloud technology, build innovative projects, and grow their technical skills. Membership is open to any student actively enrolled at HBTU who's ready to build their future in the cloud.
            </p>
            <p>
              Our group is led by dedicated Core Team members who are passionate about bringing our community to life. With support from AWS, we are responsible for growing the group, organizing inspiring events like hackathons and workshops, and championing local initiatives that matter to our peers.
            </p>
            <p>
              Ready to start your cloud journey? <Link href="/join" className="text-accent hover:underline inline-flex items-center">Apply now <span className="material-symbols-outlined text-[16px] ml-1">open_in_new</span></Link> to join the community. Check out our FAQs for more information on the program and leadership.
            </p>
          </div>
        </div>

        {/* Sidebar Column: FAQs */}
        <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-border-hairline lg:pl-12 pt-12 lg:pt-0">
          <h2 className="font-heading text-2xl font-bold mb-6 text-text">FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-border-hairline bg-bg-card rounded-md">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-sm text-text">
                Who can join the AWS SBG at HBTU?
                <span className="material-symbols-outlined text-text-muted transition group-open:rotate-180">add</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-muted border-t border-border-hairline border-t-white/5 mt-1 pt-3">
                Any student currently enrolled at HBTU with an interest in cloud computing can join, regardless of their branch or year.
              </div>
            </details>

            <details className="group border border-border-hairline bg-bg-card rounded-md">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-sm text-text">
                Why should I join the community?
                <span className="material-symbols-outlined text-text-muted transition group-open:rotate-180">add</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-muted border-t border-border-hairline border-t-white/5 mt-1 pt-3">
                You'll get hands-on experience with AWS, networking opportunities with industry professionals, access to exclusive workshops, and a chance to work on real-world projects.
              </div>
            </details>

            <details className="group border border-border-hairline bg-bg-card rounded-md">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-sm text-text">
                How do I become a core team member?
                <span className="material-symbols-outlined text-text-muted transition group-open:rotate-180">add</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-muted border-t border-border-hairline border-t-white/5 mt-1 pt-3">
                We hold an annual recruitment drive for core team positions. Active community members who demonstrate leadership and technical skills are highly encouraged to apply!
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}

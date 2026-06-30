import Link from "next/link";
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
            <details className="group border border-border-hairline bg-[#141d2f] rounded-md">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-sm text-text">
                Who can join the AWS SBG at HBTU?
                <span className="material-symbols-outlined text-text-muted transition group-open:rotate-180">add</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-muted border-t border-border-hairline border-t-white/5 mt-1 pt-3">
                Any student currently enrolled at HBTU with an interest in cloud computing can join, regardless of their branch or year.
              </div>
            </details>

            <details className="group border border-border-hairline bg-[#141d2f] rounded-md">
              <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-sm text-text">
                Why should I join the community?
                <span className="material-symbols-outlined text-text-muted transition group-open:rotate-180">add</span>
              </summary>
              <div className="p-4 pt-0 text-sm text-text-muted border-t border-border-hairline border-t-white/5 mt-1 pt-3">
                You'll get hands-on experience with AWS, networking opportunities with industry professionals, access to exclusive workshops, and a chance to work on real-world projects.
              </div>
            </details>

            <details className="group border border-border-hairline bg-[#141d2f] rounded-md">
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

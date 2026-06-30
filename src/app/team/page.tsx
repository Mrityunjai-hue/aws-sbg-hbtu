"use client";

import { useEffect, useState } from "react";
import { fetchTeamMembers, deleteTeamMember, TeamMember } from "@/lib/services/team";
import { useAuth } from "@/lib/contexts/AuthContext";
import Link from "next/link";

export default function TeamPage() {
  const { userProfile } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    setLoading(true);
    const members = await fetchTeamMembers();
    setTeamMembers(members);
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      const success = await deleteTeamMember(id);
      if (success) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete team member.");
      }
    }
  };

  return (
    <div className="px-8 py-12 md:py-20 mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs font-semibold text-text-muted mb-8 space-x-2">
        <Link href="/" className="hover:text-text hover:underline transition-all">AWS Builder Center</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span>Community</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-text">Core Team</span>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 border-b border-border-hairline pb-20">
        <div className="flex-1">
          <h1 className="mb-4 font-heading text-4xl font-extrabold text-text md:text-5xl">
            Core Team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Meet the AWS Student Builder Group core team at HBTU Kanpur.
          </p>
          <div className="flex gap-4">
            <Link href="/join" className="bg-white text-black px-6 py-2 rounded text-sm font-bold hover:bg-gray-200 transition-colors">
              Join the Team
            </Link>
            <Link href="/about" className="border border-white text-white px-6 py-2 rounded text-sm font-bold hover:bg-white/10 transition-colors">
              About the Group <span className="material-symbols-outlined text-[14px] align-middle ml-1">open_in_new</span>
            </Link>
          </div>
        </div>

        {/* Pixel Graphic */}
        <div className="flex-1 flex justify-start lg:justify-end">
          <div className="grid grid-cols-6 grid-rows-6 gap-0 border border-border-hairline/50 p-6" style={{ backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            {/* Outline of a chip / processor */}
            <div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div>
            <div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8 bg-purple-500"></div>
            <div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8 bg-purple-500"></div>
            <div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8 bg-purple-500"></div>
            <div className="w-8 h-8"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8 bg-purple-500"></div><div className="w-8 h-8"></div>
            <div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div><div className="w-8 h-8"></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-text mb-6">About the Core Team</h2>
          <div className="prose prose-invert max-w-none text-text-muted">
            The AWS Student Builder Group Core Team is responsible for growing the community, organizing inspiring events, and championing local initiatives that matter to our peers at HBTU.
          </div>
          <p className="text-sm text-text-muted mb-8 leading-relaxed">
            Every group is led by dedicated student volunteers who are passionate about bringing their ideas to life with support from AWS.
          </p>

          <h2 className="font-heading text-2xl font-bold text-text mb-6">Meet the Team</h2>
          
          <div className="flex flex-col border-t border-border-hairline">
            {loading ? (
              <div className="py-6 text-center text-text-muted text-sm">Loading team...</div>
            ) : teamMembers.length === 0 ? (
              <div className="py-6 text-center text-text-muted text-sm">No team members added yet.</div>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-6 border-b border-border-hairline hover:bg-white/5 transition-colors px-4 -mx-4 rounded">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded bg-bg-card overflow-hidden flex items-center justify-center text-accent font-bold">
                      {member.photoUrl ? (
                        <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        member.initial
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text text-sm">{member.name}</h3>
                      <p className="text-xs text-text-muted">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={`mailto:${member.email}`} className="text-sm font-semibold text-text hover:underline flex items-center gap-1">
                      Contact <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                    {userProfile?.role === "admin" && (
                      <>
                        <Link
                          href={`/admin/edit-team-member/${member.id}`}
                          className="text-text hover:text-accent p-2"
                          title="Edit member"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-500 hover:text-red-400 p-2"
                          title="Delete member"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="font-heading text-xl font-bold text-text mb-6">FAQs</h2>
          <div className="divide-y divide-border-hairline border-y border-border-hairline">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold text-text">
                <span>Who can become a Hero?</span>
                <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-45">add</span>
              </summary>
              <p className="pt-4 text-sm text-text-muted leading-relaxed">
                Any active learner at HBTU can apply during our annual recruitment drive. Look out for announcements on our events page!
              </p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold text-text">
                <span>What are the roles available?</span>
                <span className="material-symbols-outlined text-text-muted transition-transform group-open:rotate-45">add</span>
              </summary>
              <p className="pt-4 text-sm text-text-muted leading-relaxed">
                We typically recruit for technical leads, event managers, marketing heads, and community moderators.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

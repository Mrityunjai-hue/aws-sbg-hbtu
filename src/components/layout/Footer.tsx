import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants/socials";
import { 
  MeetupIcon, 
  LinkedInIcon, 
  WhatsAppIcon, 
  InstagramIcon, 
  GitHubIcon, 
  TwitterIcon, 
  EmailIcon 
} from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border-hairline bg-bg px-4 py-12 text-center text-text-muted">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-8">
        
        {/* Brand & Mission */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-heading text-xl font-bold tracking-tight text-accent">
            AWS Student Builder Group
          </div>
          <p className="text-xs uppercase tracking-widest text-text-muted/80">Harcourt Butler Technical University, Kanpur</p>
        </div>

        {/* Social Media Links Bar */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Connect With Us</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={SOCIAL_LINKS.meetup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-[#ED1C40] hover:text-[#ED1C40] hover:bg-[#ED1C40]/10 transition-all shadow-sm group"
            >
              <MeetupIcon className="w-4 h-4 text-[#ED1C40] group-hover:scale-110 transition-transform" />
              <span>Meetup</span>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all shadow-sm group"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all shadow-sm group"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>

            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all shadow-sm group"
            >
              <InstagramIcon className="w-4 h-4 text-[#E4405F] group-hover:scale-110 transition-transform" />
              <span>Instagram</span>
            </a>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-white hover:text-white hover:bg-white/10 transition-all shadow-sm group"
            >
              <GitHubIcon className="w-4 h-4 text-text group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href={SOCIAL_LINKS.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all shadow-sm group"
            >
              <TwitterIcon className="w-4 h-4 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
              <span>X (Twitter)</span>
            </a>

            <a
              href={SOCIAL_LINKS.email.url}
              className="flex items-center gap-2 rounded-full border border-border-hairline bg-bg-card px-4 py-2 text-xs font-medium text-text hover:border-amber-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all shadow-sm group"
            >
              <EmailIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-6 pt-2 border-t border-border-hairline/40 w-full max-w-md">
          <Link href="/" className="text-xs font-medium text-text-muted transition-colors hover:text-accent">
            Home
          </Link>
          <Link href="/events" className="text-xs font-medium text-text-muted transition-colors hover:text-accent">
            Events & Workshops
          </Link>
          <Link href="/team" className="text-xs font-medium text-text-muted transition-colors hover:text-accent">
            Core Team
          </Link>
          <Link href="/join" className="text-xs font-medium text-text-muted transition-colors hover:text-accent">
            Join Group
          </Link>
        </div>
        
        {/* Copyright */}
        <p className="max-w-md text-xs text-text-muted/70">
          © {new Date().getFullYear()} AWS Student Builder Group, HBTU Kanpur. Built for Builders.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 flex w-full flex-col items-center gap-4 border-t border-border-hairline bg-bg px-4 py-10 text-center">
      <div className="font-heading text-lg font-semibold text-accent">
        AWS SBG HBTU
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        <Link href="#" className="text-sm font-medium text-text-muted transition-colors hover:text-accent">
          Privacy Policy
        </Link>
        <Link href="#" className="text-sm font-medium text-text-muted transition-colors hover:text-accent">
          Code of Conduct
        </Link>
        <a href="mailto:aws.sbghbtu@gmail.com" className="text-sm font-medium text-text-muted transition-colors hover:text-accent">
          Contact Us
        </a>
      </div>
      
      <p className="mx-auto max-w-md text-sm text-text-muted">
        © {new Date().getFullYear()} AWS Student Builder Group, HBTU Kanpur. Built for Builders.
      </p>
    </footer>
  );
}

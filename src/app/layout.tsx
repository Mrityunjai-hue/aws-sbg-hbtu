import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Topnav } from "@/components/layout/Topnav";
import { Footer } from "@/components/layout/Footer";
import { FlashNotificationBanner } from "@/components/ui/FlashNotificationBanner";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ChatNotificationProvider } from "@/lib/contexts/ChatNotificationContext";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AWS Student Builder Group — HBTU Kanpur",
  description: "Learn, build, and ship cloud-powered projects together at Harcourt Butler Technical University, Kanpur.",
  metadataBase: new URL("https://aws-sbg-hbtu.vercel.app"),
  openGraph: {
    title: "AWS Student Builder Group — HBTU Kanpur",
    description: "Learn, build, and ship cloud-powered projects together at Harcourt Butler Technical University, Kanpur.",
    url: "https://aws-sbg-hbtu.vercel.app",
    siteName: "AWS SBG HBTU",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Builder Group — HBTU Kanpur",
    description: "Learn, build, and ship cloud-powered projects together at Harcourt Butler Technical University, Kanpur.",
  },
};

// Explicitly ensure user pinch-zoom is enabled per Rule 9
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Synchronous script to prevent light-theme flash before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface-lowest text-on-background antialiased selection:bg-primary-accent selection:text-white">
        <AuthProvider>
          <ChatNotificationProvider>
            <Topnav />
            <FlashNotificationBanner />
            <main className="flex-1 w-full pt-20 overflow-x-hidden min-h-[calc(100vh-80px)] flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </main>
            <Toaster theme="dark" position="bottom-right" richColors />
          </ChatNotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Topnav } from "@/components/layout/Topnav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AWS Student Builder Group — HBTU Kanpur",
  description: "Learn, build, and ship cloud-powered projects together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg text-text antialiased pb-20 md:pb-0">
        <AuthProvider>
          <Topnav />
          <div className="flex flex-1 pt-16">
            <Sidebar />
            <main className="flex-1 md:ml-64 w-full overflow-x-hidden min-h-[calc(100vh-64px)] flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </main>
          </div>
          <MobileNav />
          <Toaster theme="dark" position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}

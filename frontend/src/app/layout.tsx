import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "निर्माण | Nirman - Autonomous AI Software Development Company",
  description: "From Vision to Production, Powered by AI. Nirman is an autonomous software development platform that orchestrates specialized AI agents to plan, design, develop, test, and document complete projects automatically.",
  keywords: ["Autonomous AI", "Software Development Lifecycle", "Next.js", "FastAPI", "AI Employees", "AI War Room", "SaaS Landing Page"],
  authors: [{ name: "Nirman AI Team" }],
  openGraph: {
    title: "निर्माण | Nirman - Autonomous AI Software Development Company",
    description: "From Vision to Production, Powered by AI. Nirman is an autonomous software development platform that orchestrates specialized AI agents to plan, design, develop, test, and document complete projects automatically.",
    type: "website",
  }
};

import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-slate-100">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

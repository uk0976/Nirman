import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirman — Production-Grade AI Software Engineering Platform",
  description: "Enterprise multi-agent AI software company platform operating across the 20 SDLC phases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-[#07090E] text-gray-100">
        {children}
      </body>
    </html>
  );
}

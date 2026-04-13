import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Geist } from "next/font/google";

import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { cn } from "@/lib/utils";
import Navbar from "@/components/naviction/navbar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Dev Fllow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "suppressHydrationWarning", inter.className, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}</ThemeProvider>
      </body>
    </html>
  );
}

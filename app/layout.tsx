import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Geist } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeProvider } from "@/context/Theme";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
     lang="en"
  suppressHydrationWarning // <--- این باید اینجا باشد، بیرون از className
  className={cn(
    "antialiased",
    inter.className,
    "font-sans",
    geist.variable,
  )}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}

import LeftSidebar from "@/components/naviction/LeftSidebar";
import Navbar from "@/components/naviction/navbar";
import RightSidebar from "@/components/naviction/RightSidebar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="max-auto w-full max-w-full">{children}</div>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;

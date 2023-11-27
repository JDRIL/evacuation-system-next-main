"use client";
import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex bg-gray-100">
      <div className="flex flex-1">
        <div className="relative w-1/4 flex p-12 pr-0">
          <Navigation />
        </div>
        <div className="flex-1 overflow-y-auto p-12 ">{children}</div>
      </div>
    </div>
  );
}

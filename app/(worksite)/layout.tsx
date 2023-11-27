import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worksite",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}

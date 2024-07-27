import dynamic from "next/dynamic";
import { LoadingProvider } from "@/context/LoadingContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Dynamically import components

const Developer = dynamic(() => import("@/components/common/Developer"));
const DockBar = dynamic(() => import("@/components/common/DockBar"));
const LoadingWrapper = dynamic(
  () => import("@/components/common/LoadingWrapper"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);
const MobileMenu = dynamic(() => import("@/components/common/MobileMenu"));
const SocialIcons = dynamic(() => import("@/components/common/SocialIcons"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saad Qadeer Abbasi",
  description: "A Professional Graphic Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <LoadingWrapper>
            <DockBar />
            <MobileMenu />
            <SocialIcons />
            <Developer />
            {children}
          </LoadingWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}

import SideBar from "@/components/admin/common/SideBar";
import { LoadingProvider } from "@/context/LoadingContext";
// import "@/styles/globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "@/styles/admin.css";

const LoadingWrapper = dynamic(
  () => import("@/components/common/LoadingWrapper"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
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
            <div className="flex h-screen w-full">
              <SideBar />
              <main className="flex-1 p-4 w-full overflow-y-auto">
                {children}
              </main>
            </div>
          </LoadingWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}

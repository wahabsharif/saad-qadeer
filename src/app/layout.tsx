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
    ssr: false,
  }
);
const MobileMenu = dynamic(() => import("@/components/common/MobileMenu"));
const SocialIcons = dynamic(() => import("@/components/common/SocialIcons"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saad Qadeer - A Professional Graphic Designer",
  description:
    "Saad Qadeer Abbasi is a professional graphic designer specializing in creative and innovative design solutions. Explore a diverse portfolio showcasing exceptional skills in branding, print, digital media, and more.",
  keywords:
    "graphic design, professional graphic designer, branding, logo design, print design, digital media design, creative design, visual identity, marketing materials, web design, UI/UX design, illustration, motion graphics, animation, packaging design, social media graphics, flyer design, poster design, brochure design, business card design, stationery design, info graphics, Adobe Creative Suite, Photoshop design, Illustrator design, InDesign design, graphic designer portfolio, design consultancy, creative agency, visual communication, print marketing, digital advertising, design for web, graphic design trends, typography, brand identity, visual branding, creative direction, web graphics, social media design, user interface design, user experience design, motion design, animation design, graphic design services, digital graphics, graphic design studio, professional portfolio, design project, brand strategy, graphic design inspiration, visual storytelling, creative design solutions, graphic design ideas, design trends 2024, freelance graphic designer, graphic design for businesses, logo creation, custom graphic design, creative branding, graphic design skills, digital art, artistic design, visual aesthetics, print advertising, marketing design, graphic design expertise, high-quality design, professional design services, graphic design solutions, creative graphics, modern design, elegant design, professional visual design, innovative graphic design, graphic designer for hire, design portfolio, custom logos, visual design concepts, interactive design, graphic design techniques, creative design agency, graphic design projects, cutting-edge design, graphic design agency, high-impact visuals, design excellence, aesthetic design, graphic design expertise, unique design solutions, professional creative services, graphic design for brands, advanced graphic design, digital design trends, graphic design strategies, effective branding, innovative branding solutions, design and creativity, graphic design development, exceptional graphic design, portfolio, Saad Qadeer Abbasi",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Saad Qadeer - A Professional Graphic Designer",
    description:
      "Saad Qadeer Abbasi is a professional graphic designer specializing in creative and innovative design solutions. Explore a diverse portfolio showcasing exceptional skills in branding, print, digital media, and more.",
    url: "",
    siteName: "Saad Qadeer - A Professional Graphic Designer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saad Qadeer - A Professional Graphic Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    title: "Saad Qadeer - A Professional Graphic Designer",
    description:
      "Saad Qadeer Abbasi is a professional graphic designer specializing in creative and innovative design solutions. Explore a diverse portfolio showcasing exceptional skills in branding, print, digital media, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saad Qadeer - A Professional Graphic Designer",
      },
      {
        url: "/og-image.png",
      },
    ],
  },
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

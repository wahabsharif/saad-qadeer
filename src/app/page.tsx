import dynamic from "next/dynamic";
import { Expertise } from "@/components/home/Expertise";

// Dynamically import components
const Banner = dynamic(() => import("@/components/home/Banner"));
const MyServices = dynamic(() => import("@/components/home/MyServices"));
const Portfolio = dynamic(() => import("@/components/home/Portfolio"));

export default function Home() {
  return (
    <>
      <Banner />
      <Expertise />
      <MyServices />
      <Portfolio />
    </>
  );
}

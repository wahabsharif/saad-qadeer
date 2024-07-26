import dynamic from "next/dynamic";
import { Expertise } from "@/components/home/Expertise";

// Dynamically import components
const Banner = dynamic(() => import("@/components/home/Banner"));

export default function Home() {
  return (
    <>
      <Banner />
      <Expertise />
    </>
  );
}

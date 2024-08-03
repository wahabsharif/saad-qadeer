"use client";
import BannerImage from "@/assets/home/home-banner.png";
import BlurFade from "@/components/magicui/blur-fade";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CreativeText from "@/components/home/CreativeText"; // Import the CreativeText component

const ShimmerButton = dynamic(
  () => import("@/components/magicui/shimmer-button"),
  {
    ssr: false,
  }
);

const Banner = () => {
  // State for mouse position
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Define the spring animation
  const [props, api] = useSpring(() => ({
    transform: "perspective(600px) rotateY(0deg) rotateX(0deg)",
    config: { tension: 120, friction: 14 },
  }));

  // Function to handle mouse movement
  const handleMouseMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24; // Adjust multiplier as needed
      const y = (e.clientY / window.innerHeight - 0.5) * -12; // Adjust multiplier as needed
      setMouse({ x, y });
    },
    []
  );

  // Update the spring animation based on mouse position
  useEffect(() => {
    api.start({
      transform: `perspective(600px) rotateY(${mouse.x}deg) rotateX(${mouse.y}deg)`,
    });
  }, [mouse, api]);

  // Attach mousemove event listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Function to handle button click
  const handleClick = () => {
    const phoneNumber = "+923175487963"; // Replace with your phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className="flex flex-col items-center justify-center overflow-hidden px-5 bg-section-gradient">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Intro */}
        <div className="text-left mt-4">
          <BlurFade delay={0.25} inView>
            <CreativeText animationStyle={2} />{" "}
            {/* Apply the desired animation style */}
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <p className="mt-4 lg:text-xl text-sm">
              With 3+ years as a graphic designer, I create impactful designs
              using Illustrator and Photoshop, crafting stories through visuals.
              Let&apos;s collaborate!
            </p>
          </BlurFade>
          <div className="my-4">
            <ShimmerButton className="shadow-2xl" onClick={handleClick}>
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-yellow dark:to-sky-700 lg:text-lg">
                HIRE ME!
              </span>
            </ShimmerButton>
          </div>
        </div>

        {/* Image */}
        <animated.div className={"mt-5"} style={{ ...props }}>
          <BlurFade delay={0.25} inView>
            <div className="flex justify-center items-center">
              <Image
                src={BannerImage}
                alt="Sample"
                width={500}
                height={500}
                className="w-full h-auto rounded-2xl"
                priority // Ensure the image is loaded as soon as possible
              />
            </div>
          </BlurFade>
        </animated.div>
      </div>
    </section>
  );
};

export default Banner;

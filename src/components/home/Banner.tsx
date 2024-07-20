"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import BannerImage from "@/assets/home/home-banner.png";
import ShimmerButton from "@/components/magicui/shimmer-button";

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
    <section className="h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="flex w-full max-w-6xl mx-auto px-5 items-center justify-center relative">
        {/* Intro */}
        <div className="flex-1 text-left mr-4">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold title-gradient sm:text-5xl xl:text-6xl/none">
              Hello 👋
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
            <p className="mt-4 text-xl">
              Hi, I&apos;m{" "}
              <span className="text-yellow">Saad Qadeer Abbasi</span>, a graphic
              designer with over 3 years of experience. I specialize in creating
              stunning designs using Adobe Illustrator and Photoshop. Whether
              you need logos, banners, flyers, social media posts, or any
              Photoshop work, I can help. I believe that great designs should
              not only look fantastic but also tell a compelling story.
              I&apos;ll take the time to understand your needs and craft
              something truly special for you. Let&apos;s collaborate and create
              something amazing together!
            </p>
          </BlurFade>
          <div className="mt-2 items-center justify-center">
            <ShimmerButton className="shadow-2xl" onClick={handleClick}>
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-yellow dark:to-sky-700 lg:text-lg">
                HIRE ME!
              </span>
            </ShimmerButton>
          </div>{" "}
        </div>

        {/* Image */}
        <animated.div
          style={{
            ...props,
          }}
        >
          <BlurFade delay={0.25} inView>
            <div className="flex-1 flex justify-center items-center">
              <Image
                src={BannerImage}
                alt="Sample"
                width={500}
                height={500}
                className="w-50 h-auto rounded-2xl"
              />
            </div>
          </BlurFade>
        </animated.div>
      </div>
    </section>
  );
};

export default Banner;

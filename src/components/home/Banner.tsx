"use client";
import React, { useCallback, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import BannerImage from "@/assets/home/home-banner.png";

const Banner = () => {
  // Define the spring animation
  const [props, api] = useSpring(() => ({
    y: 0,
    config: { tension: 120, friction: 14 },
  }));

  // Function to handle scroll events
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    api.start({ y: scrollY * 0.3 }); // Adjust multiplier to control the parallax effect
  }, [api]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="h-[80vh] flex items-center justify-center">
      <animated.div
        style={{
          transform: props.y.to((y) => `translateY(${y}px)`),
        }}
        className="relative w-full flex items-center justify-center text-white text-2xl"
      >
        <div className="flex w-full max-w-6xl mx-auto px-5 items-center justify-center">
          {/* Intro */}
          <div className="flex-1 text-left mr-4 ">
            <BlurFade delay={0.25} inView>
              <h2 className="text-3xl font-bold title-gradient sm:text-5xl xl:text-6xl/none">
                Hello 👋
              </h2>
            </BlurFade>
            {/* <h1 className="text-4xl font-bold title-gradient">
              Welcome To My Profile
            </h1> */}
            <BlurFade delay={0.25 * 3} inView>
              <p className="mt-4 text-xl">
                Hi, I&apos;m{" "}
                <span className="text-yellow">Saad Qadeer Abbasi</span>, a
                graphic designer with over 3 years of experience. I specialize
                in creating stunning designs using Adobe Illustrator and
                Photoshop. Whether you need logos, banners, flyers, social media
                posts, or any Photoshop work, I can help. I believe that great
                designs should not only look fantastic but also tell a
                compelling story. I&apos;ll take the time to understand your
                needs and craft something truly special for you. Let&apos;s
                collaborate and create something amazing together!
              </p>
            </BlurFade>
          </div>
          {/* Image */}
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
        </div>
      </animated.div>
    </section>
  );
};

export default Banner;

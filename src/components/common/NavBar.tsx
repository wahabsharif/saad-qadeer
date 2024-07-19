"use client";

import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation configuration
  const props = useSpring({
    from: { transform: "scale(0.5)", opacity: 0 },
    to: isLoaded
      ? [
          { transform: "scale(1.1)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 },
        ]
      : { transform: "scale(0.5)", opacity: 0 },
    config: { tension: 250, friction: 30, duration: 1000 },
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <header className="fixed bottom-3 left-0 right-0 flex justify-center">
      <animated.div
        style={props}
        className="bg-white/30 backdrop-blur-sm rounded-full shadow-md neon-border"
      >
        <div className="flex h-12 max-w-lg items-center justify-between p-2">
          <div className="relative group flex-1 text-center">
            <Link
              href={"/"}
              className="relative z-10 inline-flex flex-col items-center justify-center px-5"
            >
              <GoHomeFill className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-300" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 dark:bg-gray-700">
              Home
            </div>
          </div>
          <div className="relative group flex-1 text-center">
            <Link
              href={"/about"}
              className="relative z-10 inline-flex flex-col items-center justify-center px-5"
            >
              <FaUser className="text-gray-600 dark:text-gray-300 group-hover:text-green-500 dark:group-hover:text-green-300" />
              <span className="sr-only">About</span>
            </Link>
            <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 dark:bg-gray-700">
              About
            </div>
          </div>
          <div className="relative group flex-1 text-center">
            <Link
              href={"/portfolio"}
              className="relative z-10 inline-flex flex-col items-center justify-center px-5"
            >
              <LuGalleryHorizontalEnd className="text-gray-600 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-300" />
              <span className="sr-only">Portfolio</span>
            </Link>
            <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 dark:bg-gray-700">
              Portfolio
            </div>
          </div>
          <div className="relative group flex-1 text-center">
            <Link
              href={"/contact"}
              className="relative z-10 inline-flex flex-col items-center justify-center px-5"
            >
              <FaPhone className="text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-300" />
              <span className="sr-only">Contact</span>
            </Link>
            <div className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 dark:bg-gray-700">
              Contact
            </div>
          </div>
        </div>
      </animated.div>
    </header>
  );
};

export default NavBar;

"use client";

import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import Link from "next/link";

// Data for the dock items with icons and links
const dockItems = [
  { name: "Home", icon: <GoHomeFill size={24} />, href: "/" },
  { name: "About", icon: <FaUser size={24} />, href: "/about" },
  {
    name: "Portfolio",
    icon: <FaBarsStaggered size={24} />,
    href: "/portfolio",
  },
  { name: "Contact", icon: <FaPhone size={24} />, href: "/contact" },
];

const DockBar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
    <header className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-50 hidden md:block lg:block">
      <animated.div
        style={props}
        className="flex flex-col items-center justify-center space-y-2 backdrop-blur-sm bg-white/30 rounded-full"
      >
        <ul className="flex items-center space-x-4 px-4 py-1">
          {dockItems.map((item, index) => (
            <li
              key={index}
              className={`relative flex items-center justify-center w-8 h-8 transform transition-transform duration-200 ${
                hoveredIndex === index ? "scale-125 -translate-y-1" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={item.href}
                className="flex items-center justify-center w-full h-full"
              >
                <div className="text-white text-sm">{item.icon}</div>
              </Link>
              <span
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded-md ${
                  hoveredIndex === index ? "block" : "hidden"
                }`}
              >
                {item.name}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-b-black" />
              </span>
            </li>
          ))}
        </ul>
      </animated.div>
    </header>
  );
};

export default DockBar;

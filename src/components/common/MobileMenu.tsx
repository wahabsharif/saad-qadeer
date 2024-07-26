"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { GiTireIronCross } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { FaBarsStaggered } from "react-icons/fa6";
import {
  FaUser,
  FaPhone,
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/wahab-sharif-logo.svg";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home", icon: <GoHomeFill size={24} />, href: "/" },
  { name: "About", icon: <FaUser size={24} />, href: "/about" },
  {
    name: "Portfolio",
    icon: <FaBarsStaggered size={24} />,
    href: "/portfolio",
  },
  { name: "Contact", icon: <FaPhone size={24} />, href: "/contact" },
];

const socialIcons = [
  { icon: <FaFacebook size={20} />, href: "#" },
  {
    icon: <FaInstagram size={20} />,
    href: "https://www.instagram.com/abbasistudios?igsh=MWR3MHJ0c3g0MmVpNQ==",
  },
  {
    icon: <FaLinkedinIn size={20} />,
    href: "https://www.linkedin.com/in/saadqadeer7223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  { icon: <FaBehance size={20} />, href: "https://www.behance.net/saad7223" },
];

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Close the menu on route change
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-2 font-extrabold text-slate-900 backdrop-blur-sm bg-white/50 neon-border rounded-full shadow-lg md:hidden"
        onClick={toggleMenu}
        initial={{ scale: 1 }}
        animate={{ scale: isOpen ? 1.1 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {isOpen ? (
          <GiTireIronCross className="font-bold" size={24} />
        ) : (
          <HiMiniBars3BottomLeft className="font-bold" size={24} />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 z-40 backdrop-blur-sm bg-white/30 neon-border rounded-xl p-4 md:hidden"
          >
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ scale: 1.1, color: "#F59E0B" }} // Hover effect
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-6 text-gray-800 hover:text-yellow"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            {/* Line Below Menu */}
            <hr className="my-6 border-gray-300" />
            {/* Social Icons */}
            <div className="flex space-x-4 mb-2">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, color: "#F59E0B" }} // Hover effect
                  transition={{ duration: 0.2 }}
                  className="text-gray-800 hover:text-yellow"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Designed and Developed Section */}
      <motion.div
        className={`flex fixed bottom-0 inset-x-0 bg-devIcon text-sky-100 p-4 rounded-full shadow-lg items-center justify-center space-x-2 text-sm z-30 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <span className="flex items-center space-x-2">
          <span>Designed and Developed with ❤️ by</span>
          <Link href="https://wahabsharif.me/" className="flex items-center">
            <Image
              src={Logo}
              alt="Developer Logo"
              width={40}
              height={40}
              className="w-8 h-auto"
            />
          </Link>
        </span>
      </motion.div>
    </div>
  );
};

export default MobileMenu;

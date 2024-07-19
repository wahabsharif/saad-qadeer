import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="fixed z-50 h-10 w-auto -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-2 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex h-full max-w-lg mx-auto items-center justify-between relative">
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
            <div className="tooltip-arrow" data-popper-arrow></div>
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
            <div className="tooltip-arrow" data-popper-arrow></div>
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
            <div className="tooltip-arrow" data-popper-arrow></div>
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
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

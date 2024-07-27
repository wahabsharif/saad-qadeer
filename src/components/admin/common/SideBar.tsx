"use client";
import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { RiHome5Line } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import AdminImage from "@/assets/admin/admin-profile-image.jpeg";

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`flex flex-col items-center h-screen py-8 bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-yellow sidebar ${
        isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col flex-1 space-y-6">
        <Link
          href="/admin"
          className="sidebar-item p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <RiHome5Line className="h-6 w-6 text-yellow" />
          <span className="sidebar-title text-yellow">Dashboard</span>
        </Link>

        <Link
          href="/admin/portfolio"
          className="sidebar-item p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <GrGallery className="h-6 w-6 text-yellow" />
          <span className="sidebar-title text-yellow">Portfolio</span>
        </Link>
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col space-y-5 mt-auto bottom-10">
        <Link
          href="#"
          className="sidebar-item p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <LuSettings className="h-6 w-6 text-yellow" />
          <span className="sidebar-title text-yellow">Settings</span>
        </Link>

        <Link href="#" className="sidebar-item">
          <Image
            className="object-cover w-8 h-8 rounded-full"
            src={AdminImage}
            alt="Admin Profile"
            width={32}
            height={32}
          />
          <span className="sidebar-title text-yellow">Admin</span>
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;

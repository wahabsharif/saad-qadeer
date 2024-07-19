"use client";

import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/wahab-sharif-logo.svg";
import { CSSTransition } from "react-transition-group";

const Developer = () => {
  const [showText, setShowText] = useState(false);

  const toggleTextVisibility = () => {
    setShowText((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        className="fixed bottom-0 right-0 p-2"
        onClick={toggleTextVisibility}
      >
        <FaInfoCircle className="text-devIcon text-5xl cursor-pointer transition-transform duration-300 ease-in-out hover:animate-heartbeat" />
      </div>
      <CSSTransition
        in={showText}
        timeout={500}
        classNames="text-fade"
        unmountOnExit
      >
        <div className="fixed bottom-0 right-14 mb-3 mr-2 bg-devIcon text-sky-100 p-2 rounded-2xl shadow-lg flex items-center space-x-2">
          <span className="mr-2">Designed and Developed with &#10084; by</span>
          <Link href="https://wahabsharif.me/" className="flex items-center">
            <Image
              src={Logo}
              alt="Developer Logo"
              width={100}
              height={100}
              className="w-8 h-auto"
            />
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Developer;

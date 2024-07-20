// src/components/common/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";

export function LoadingScreen() {
  const [value, setValue] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const increment = () => {
      setValue((prev) => {
        if (prev >= 100) {
          setIsFadingOut(true); // Start fade out when reaching 100%
          return 100;
        }
        return Math.min(prev + 20, 100); // Increment by 20, up to 100
      });
    };

    increment(); // Initial increment
    const interval = setInterval(increment, 500); // Increment every 0.5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (isFadingOut) {
      const fadeOutTimer = setTimeout(() => {
        setValue(0); // Reset value to 0 or handle component removal
      }, 500); // Duration of fade-out transition

      return () => clearTimeout(fadeOutTimer); // Cleanup timeout on component unmount
    }
  }, [isFadingOut]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient z-50 transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <AnimatedCircularProgressBar
          className="bg-gradient-content"
          max={100}
          min={0}
          value={value}
          gaugePrimaryColor="rgb(255, 204, 0)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.2)"
        />
      </div>
    </div>
  );
}

// src/components/common/LoadingWrapper.tsx
"use client";

import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/common/LoadingScreen";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, setLoading } = useLoading();

  // Simulate loading state to test
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading time

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

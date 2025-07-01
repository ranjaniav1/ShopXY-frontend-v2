"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "../context/LoadingContext";

const NavigationEventsHandler = () => {
  const pathname = usePathname();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin" />
    </div>
  );
};

export default NavigationEventsHandler;

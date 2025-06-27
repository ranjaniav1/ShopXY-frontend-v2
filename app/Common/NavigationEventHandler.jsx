// app/Common/NavigationEventHandler.tsx
"use client";
import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePathname } from "next/navigation";
import { useLoading } from "../context/LoadingContext";

const NavigationEventsHandler = () => {
  const pathname = usePathname();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false); // wait till transition completes visually
    }, 100); // adjust based on perceived loading

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default NavigationEventsHandler;

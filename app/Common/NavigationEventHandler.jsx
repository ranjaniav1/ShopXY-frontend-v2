"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import { Box, CircularProgress } from "@mui/material";

const NavigationEventsHandler = () => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    
    setIsNavigating(true);

    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 500); // spinner visible for at least 500ms

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
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

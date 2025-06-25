"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavCartButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/scheckout/carts")}
      className="relative p-2 hover:bg-secondary/20 rounded"
    >
      <ShoppingCartIcon className="text-primary" />
      {/* Badge bubble if needed */}
      {/* <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 rounded-full">3</span> */}
    </button>
  );
};

export default NavCartButton;

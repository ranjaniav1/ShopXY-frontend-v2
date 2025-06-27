"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import ClientLink from "@/app/Common/ClientClick"; // make sure the path is correct

const NavCartButton = ({ cartCount = 0 }) => {
  return (
    <ClientLink
      href="/scheckout/carts"
      className="relative p-2 hover:bg-secondary/20 rounded transition"
      aria-label="Cart"
    >
      <ShoppingCart className="text-primary w-6 h-6" />

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full font-medium">
          {cartCount}
        </span>
      )}
    </ClientLink>
  );
};

export default NavCartButton;

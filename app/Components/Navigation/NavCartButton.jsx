"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import ClientLink from "@/app/Common/ClientClick"; 

const NavCartButton = () => {
  return (
    <ClientLink
      href="/scheckout/carts"
      className="relative p-2 hover:bg-secondary/20 rounded transition"
      aria-label="Cart"
    >
      <ShoppingCart className="text-primary w-6 h-6" />
    </ClientLink>
  );
};

export default NavCartButton;

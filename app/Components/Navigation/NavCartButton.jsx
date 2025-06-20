'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react'; // Or any other icon you prefer

const NavCartButton = ({ count = 0 }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/scheckout/carts")}
      className="relative p-2 rounded-full hover:bg-gray-100 transition"
      aria-label="Cart"
    >
      {/* Icon */}
      <ShoppingCart className="w-5 h-5 text-gray-700" />

      {/* Badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
          {count}
        </span>
      )}
    </button>
  );
};

export default NavCartButton;

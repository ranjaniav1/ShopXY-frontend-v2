"use client";
import ClientLink from "@/app/Common/ClientClick";
import React from "react";

const CardCategory = ({ item }) => {
  return (
    <ClientLink
      href={`/category/${item.slug}`}
      className="group relative bg-body rounded-xl overflow-hidden shadow transition duration-300 hover:shadow-lg"
    >
      <div className="relative h-40 sm:h-48 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={item.category_icon}
          alt={item.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="p-3 text-center">
        <p className="font-semibold text-tprimary truncate group-hover:text-tactive transition-colors duration-200">
          {item.title}
        </p>
        {item.count && (
          <p className="text-xs text-tsecondary mt-1">{`+${item.count} items`}</p>
        )}
      </div>
    </ClientLink>
  );
};

export default CardCategory;

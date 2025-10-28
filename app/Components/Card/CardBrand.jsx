"use client";
import React from "react";
import ClientLink from "../Common/ClientClick";

const CardBrand = ({ item }) => {
  return (
    <ClientLink
      href={`/brand/${item.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 flex flex-col h-36"
    >
      <div className="w-full h-36 p-4 overflow-hidden flex justify-center items-center">
        <img
          src={item.brand_image}
          alt={item.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </ClientLink>
  );
};

export default CardBrand;

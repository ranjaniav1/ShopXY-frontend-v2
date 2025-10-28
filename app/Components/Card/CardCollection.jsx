"use client";
import React from "react";
import ClientLink from "../Common/ClientClick";

const CardCollection = ({ item }) => {
  return (
    <ClientLink
      href={`/collection/${item.slug}`}
      className="group bg-body rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 flex flex-col h-64"
    >
      <div className="w-full h-48 p-4 overflow-hidden">
        <img
          src={item.collection_image}
          alt={item.title}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-center items-center px-3 py-2 text-center flex-grow">
        <h3 className="text-base font-semibold text-tprimary">{item.title}</h3>
        <p className="text-sm text-tsecondary">
          {item.category?.title || "Explore now"}
        </p>
      </div>
    </ClientLink>
  );
};

export default CardCollection;

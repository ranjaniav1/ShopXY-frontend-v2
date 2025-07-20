"use client";

import React from "react";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const Brands = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-body py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-tprimary">
            {t("Trusted Brands")}
          </h2>
          <p className="text-tsecondary mt-2 text-base">
            {t("Shop from the worlds most trusted brands")}
          </p>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.slice(3, 8).map((brand) => (
              <ClientLink
                key={brand._id}
                href={`/brand/${brand.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 flex flex-col h-36"
              >
                {/* Image with fixed height and responsive scaling */}
                <div className="w-full h-48 p-4 overflow-hidden">
                  <img
                    src={brand.brand_image}
                    alt={brand.title}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                </div>


              </ClientLink>
            ))}
          </div>
        ) : (
          <CustomTypography textAlign="center" className="text-tsecondary mt-4">
            {t("No brands found")}
          </CustomTypography>
        )}
      </div>
    </div>
  );
};

export default Brands;

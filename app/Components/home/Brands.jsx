"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import CustomTypography from "@/app/Custom/CustomTypography";
import Heading from "@/app/Common/Heading";
import CardBrand from "../card/BrandCard";

const Brands = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-body py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <Heading title={t("Trusted Brands")} subtitle={t("Shop from the worlds most trusted brands")} />


        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.slice(3, 8).map((brand) => (
              <CardBrand key={brand._id} item={brand} />
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

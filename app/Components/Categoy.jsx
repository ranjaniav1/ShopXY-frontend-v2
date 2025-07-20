"use client";

import React from "react";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const Category = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="py-12 max-w-screen-xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-tprimary">
          {t("Shop by Category")}
        </h2>
        <p className="text-tsecondary mt-2 text-base max-w-xl mx-auto">
          {t("Discover our extensive range of products across all your favorite categories")}
        </p>
      </div>

      {/* Grid */}
      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data.slice(0, 8).map((category, idx) => (
              <ClientLink
                key={category.id || idx}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                <div className="h-40 sm:h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={category.category_icon}
                    alt={category.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-tprimary truncate">
                    {category.title}
                  </p>
                  {category.product_count && (
                    <p className="text-sm text-tsecondary">
                      {category.product_count}+ {t("Products")}
                    </p>
                  )}
                </div>
              </ClientLink>
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="mt-10 text-center">
            <ClientLink
              href="/categories"
              className="inline-block px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition font-medium"
            >
              {t("View All Categories")}
            </ClientLink>
          </div>
        </>
      ) : (
        <CustomTypography textAlign="center" className="text-tsecondary mt-8">
          {t("No category found")}
        </CustomTypography>
      )}
    </div>
  );
};

export default Category;

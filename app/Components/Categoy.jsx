"use client";

import React from "react";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";
import Heading from "../Common/Heading";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const Category = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="py-12 max-w-screen-xl mx-auto px-4">
      {/* Heading */}
      <Heading
        title={t("Shop by Category")}
        subtitle={t("Discover our extensive range of products across all your favorite categories")}
      />

      {data.length > 0 ? (
        <>
          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
            {data.slice(0, 8).map((category, idx) => (
              <motion.div
                key={category.id || idx}
                custom={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ClientLink
                  href={`/category/${category.slug}`}
                  className="group relative bg-body rounded-xl overflow-hidden shadow transition duration-300 hover:shadow-lg"
                >
                  {/* Image with overlay */}
                  <div className="relative h-40 sm:h-48 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={category.category_icon}
                      alt={category.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Color overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>

                  {/* Title + Product Count */}
                  <div className="p-3 text-center">
                    <p className="font-semibold text-tprimary truncate group-hover:text-tactive transition-colors duration-200">
                      {category.title}
                    </p>
                    {category.count && (
                      <p className="text-xs text-tsecondary mt-1">{`+${category.count} items`}</p>
                    )}
                  </div>
                </ClientLink>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-10 text-center">
            <ClientLink
              href="/category"
              className="inline-block px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition font-medium"
            >
              {t("View All Categories")}
            </ClientLink>
          </div>
        </>
      ) : (
        <CustomTypography textAlign="center" className="text-tsecondary mt-8">
          {t("No categories found")}
        </CustomTypography>
      )}
    </div>
  );
};

export default Category;

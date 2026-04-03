"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Heading from "../../Common/Heading";
import ClientLink from "../../Common/ClientClick";
import CustomTypography from "../../Custom/CustomTypography";
import CardCategory from "../card/CategoryCard";

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

  if (data.length === 0) {
    return (
      <CustomTypography textAlign="center" className="text-tsecondary mt-8">
        {t("No categories found")}
      </CustomTypography>
    );
  }

  return (
    <section className="py-12 max-w-screen-xl mx-auto px-4">
      {/* Heading */}
      <Heading
        title={t("Shop by Category")}
        subtitle={t(
          "Discover our extensive range of products across all your favorite categories"
        )}
      />

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
            <CardCategory item={category} />
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
    </section>
  );
};

export default Category;

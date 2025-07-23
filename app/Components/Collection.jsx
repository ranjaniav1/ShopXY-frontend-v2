"use client";

import React from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const Collection = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <Heading title={t("Top Collections")} subtitle={t("Curated collections for every lifestyle")} />


        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {data.slice(3, 8).map((col) => (
                <ClientLink
                  key={col._id}
                  href={`/collection/${col.slug}`}
                  className="group bg-body rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300 flex flex-col h-64"
                >
                  {/* Image with fixed height and responsive scaling */}
                  <div className="w-full h-48 p-4 overflow-hidden">
                    <img
                      src={col.collection_image}
                      alt={col.title}
                      className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content vertically centered */}
                  <div className="flex flex-col justify-center items-center px-3 py-2 text-center flex-grow">
                    <h3 className="text-base font-semibold text-tprimary">
                      {col.title}
                    </h3>
                    <p className="text-sm text-tsecondary">
                      {col.category.title}
                    </p>
                  </div>
                </ClientLink>
              ))}
            </div>
            <div className="mt-10 text-center">
              <ClientLink
                href="/collections"
                className="inline-block px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition font-medium"
              >
                {t("View All Collections")}
              </ClientLink>
            </div>
          </>
        ) : (
          <CustomTypography textAlign="center" className="text-tsecondary mt-4">
            {t("No collections found")}
          </CustomTypography>
        )}
      </div>
    </div >
  );
};

export default Collection;

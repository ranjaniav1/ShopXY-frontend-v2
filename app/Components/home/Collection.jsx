"use client";

import React from "react";
import Heading from "../../Common/Heading";
import ClientLink from "../../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../../Custom/CustomTypography";
import CardCollection from "../card/CollectionCard"; 

const Collection = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Heading */}
        <Heading
          title={t("Top Collections")}
          subtitle={t("Curated collections for every lifestyle")}
        />

        {data.length > 0 ? (
          <>
            {/* ✅ Use reusable card component */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {data.slice(3, 8).map((col) => (
                <CardCollection key={col._id} item={col} type="collection" />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 text-center">
              <ClientLink
                href="/collection"
                className="inline-block px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition font-medium"
              >
                {t("View All Collections")}
              </ClientLink>
            </div>
          </>
        ) : (
          <CustomTypography
            textAlign="center"
            className="text-tsecondary mt-4"
          >
            {t("No collections found")}
          </CustomTypography>
        )}
      </div>
    </div>
  );
};

export default Collection;

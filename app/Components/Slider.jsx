"use client";

import { t } from "i18next";
import ClientLink from "../Common/ClientClick";
import CustomSwiper from "../Custom/CustomSwiper";

const Slider = ({ data }) => (
  <div className="w-full overflow-hidden shadow-xl relative">
    <CustomSwiper
      data={data}
      renderContent={(slide) => (
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
          <ClientLink href={`/category/${slide.slug}`}>
            <img
              src={slide.slider_image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

            {/* Centered content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 z-20">
              <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 leading-tight drop-shadow-lg">
                {t("Discover Your Perfect Style")}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg font-medium mb-4 md:mb-6 max-w-xl sm:max-w-2xl drop-shadow-md">
               {t("Shop from thousands of premium products across 10+ categories. Free shipping on orders above ₹999.")}
              </p>

            </div>
          </ClientLink>

        </div>
      )}
    />
  </div>
);

export default Slider;

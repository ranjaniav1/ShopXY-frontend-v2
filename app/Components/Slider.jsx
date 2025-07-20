"use client";

import ClientLink from "../Common/ClientClick";
import CustomSwiper from "../Custom/CustomSwiper";

const Slider = ({ data }) => (
  <div className="w-full  overflow-hidden shadow-xl relative">
    <CustomSwiper
      
      data={data} 
      renderContent={(slide) => (
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
          <img
            src={slide.slider_image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

          {/* Centered Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              Discover Your Perfect Style
            </h1>
            <p className="text-white text-sm md:text-lg font-medium mb-6 max-w-2xl drop-shadow-md">
              Shop from thousands of premium products across 10+ categories.
              Free shipping on orders above ₹999.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <ClientLink
                href={`/category/${slide.slug}`}
                className="bg-primary text-white text-sm md:text-base px-6 py-2 md:px-8 md:py-3 rounded font-medium hover:bg-gray-100 transition duration-300"
              >
                Explore Categories
              </ClientLink>
              <ClientLink
                href="/deals"
                className=" text-white text-sm md:text-base px-6 py-2 md:px-8 md:py-3 rounded font-medium hover:bg-red-700 transition duration-300"
              >
                View Deals
              </ClientLink>
            </div>

          </div>
        </div>
      )}
    />
  </div>
);

export default Slider;

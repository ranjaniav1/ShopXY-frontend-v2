"use client";
import { useEffect, useState } from "react";
import { fetchHomeData } from "./Service/home";
import dynamic from "next/dynamic";
import Slider from "./Components/home/Slider";
import Categoy from "./Components/home/Categoy";
import Collection from "./Components/home/Collection";
import Brands from "./Components/home/Brands";
import CustomSkeleton from "./Custom/CustomSkeleton";

// Lazy load HomeProduct
const HomeProduct = dynamic(() => import("./Components/home/HomeProduct"), {
  ssr: false,
  loading: () => (
    <p className="text-center mt-10 text-gray-500">Loading products...</p>
  ),
});

/**
 * Reusable wrapper to handle loading & skeleton display
 */
const SectionLoader = ({ loading, children, type = "card", count = 6, width, height }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <CustomSkeleton key={i} type={type} width={width} height={height} />
        ))}
      </div>
    );
  }
  return children;
};


export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData()
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching data", err);
      })
      .finally(() => setLoading(false));
  }, []);
  
  useEffect(() => {
    document.title = "ShopXY - Your One-Stop eCommerce Store";
  }, []);

  return (
   <div className="space-y-6">
      {/* Slider */}
      <SectionLoader loading={loading} type="card">
        {data?.sliders && <Slider data={data.sliders} />}
      </SectionLoader>

      {/* Categories */}
      <SectionLoader loading={loading} type="rounded" width="70px" height="70px">
        {data?.categories && <Categoy data={data.categories} />}
      </SectionLoader>

      {/* Collections */}
      <SectionLoader loading={loading} type="card">
        {data?.collections && <Collection data={data.collections} />}
      </SectionLoader>

      {/* Brands */}
      <SectionLoader loading={loading} type="card">
        {data?.brands && <Brands data={data.brands} />}
      </SectionLoader>

      {/* Home Products */}
      <HomeProduct />
    </div>
  );
}

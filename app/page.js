"use client";
import { useEffect, useState } from "react";
import { fetchHomeData } from "./Service/home";
import dynamic from "next/dynamic";
import Slider from "./Components/Slider";
import Categoy from "./Components/Categoy";
import Collection from "./Components/Collection";
import Brands from "./Components/Brands";
import CustomSkeleton from "./Custom/CustomSkeleton";

// Lazy load HomeProduct
const HomeProduct = dynamic(() => import("./Components/HomeProduct"), {
  ssr: false,
  loading: () => (
    <p className="text-center mt-10 text-gray-500">Loading products...</p>
  ),
});

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

  return (
    <div className="space-y-6">
      {loading ? (
        <CustomSkeleton type="card" />
      ) : (
        <Slider data={data.sliders} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CustomSkeleton key={i} type="rounded" width="70px" height="70px" />
          ))}
        </div>
      ) : (
        <Categoy data={data.categories} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CustomSkeleton key={i} type="card" />
          ))}
        </div>
      ) : (
        <Collection data={data.collections} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CustomSkeleton key={i} type="card" />
          ))}
        </div>
      ) : (
        <Brands data={data.brands} />
      )}

      <HomeProduct />
    </div>
  );
}

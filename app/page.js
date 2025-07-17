"use client";
import { useEffect, useState } from "react";
import { fetchHomeData } from "./Service/home";
import dynamic from "next/dynamic";
import Slider from "./Components/Slider";
import Categoy from "./Components/Categoy";
import Collection from "./Components/Collection";
import Brands from "./Components/Brands";
import CustomSkeleton from "./Custom/CustomSkeleton";

// 🔁 Lazy load HomeProduct for performance
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
        setLoading(false)
      })
      .catch((err) => {
        console.error("❌ Error fetching data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);



  if (!data && loading) {
    return (
      <CustomSkeleton type="card" />
    );
  }

  return (
    <div>
      <Slider data={data.sliders} />
      <Categoy data={data.categories} />
      <Collection data={data.collections} />
      <Brands data={data.brands} />
      <HomeProduct />
    </div>
  );
}

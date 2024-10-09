"use client";
import { useEffect } from "react";
import Categoy from "./Components/Categoy";
import Collection from "./Components/Collection";
import HomeProduct from "./Components/HomeProduct";
import SaleAndDiscount from "./Components/SaleAndDiscount";
import Slider from "./Components/Slider";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <>
      <Head>
        <title>ShopXY - Your One-Stop E-commerce Platform</title>
        <meta
          name="description"
          content="ShopXY provides a wide range of products at competitive prices. Explore our categories and collections today!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div data-aos="fade-up">
        <Categoy />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Slider />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Collection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <SaleAndDiscount />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <HomeProduct />
      </div>
    </>
  );
}

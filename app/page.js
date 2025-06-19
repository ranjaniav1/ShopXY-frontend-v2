"use client";
import Categoy from "./Components/Categoy";
import Collection from "./Components/Collection";
import Brands from "./Components/Brands";
// import HomeProduct from "./Components/HomeProduct";
import Slider from "./Components/Slider";

import Head from "next/head";
export default function Home() {
 
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
        <Slider />
        <Categoy />
        <Collection />
        <Brands/>
        {/* <HomeProduct /> */}
    </>
  );
}

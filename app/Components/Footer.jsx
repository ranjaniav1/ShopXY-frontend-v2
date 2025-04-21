import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Container, Divider, Grid, Link as MUILink } from "@mui/material";
import React from "react";
import CustomBox from "../Custom/CustomBox";

const Footer = () => {
  // Define your categories here
  const categories = [
    { name: "Electronics", link: "/categories/1/electronics" },
    {
      name: "Jewellwey & Accessories",
      link: "/categories/2/Jewellery-and-Accessories"
    },
    { name: "Home & kitchen", link: "/categories/3/Home-and-Kitchen" },
    { name: "Bags & Footwear", link: "/categories/4/Bags-and-Footwear" },
    { name: "Bady Products", link: "/categories/5/babies-products" },
    { name: "Beverages", link: "/categories/6/food-Beverages" },
    { name: "Sport Outdoor", link: "/categories/7/Sports-Outdoors" },
    { name: "Pet Supplies", link: "/categories/8/Pet-Supplies" },
    { name: "Stationary", link: "/categories/9/Stationary" }
  ];

  const collection = [
    { name: "mobile phone", link: "/categories/collections/101/mobile-phones" },
    { name: "Laptops", link: "/categories/collections/102/laptops" },
    { name: "Tablets", link: "/categories/collections/103/tablets" },
    { name: "Camera", link: "/categories/collections/104/Camera" },
    { name: "Headphones", link: "/categories/collections/105/headphones" },
    { name: "Smart Watch", link: "/categories/collections/106/smart-watch" }
  ];

  return (
    <CustomBox>
      <Container maxWidth="xl">
        <div className="p-3">
          <Grid container>
            <Grid item xs={12} md={3}>
              <div className="px-3">
                <h1 className="text-2xl font-semibold ml-2 my-3">ShopXY</h1>
                <p>
                  At ShopXY, you can find all your favorite products in one
                  place, from home essentials to the latest gadgets. We aim to
                  provide you with the best shopping experience.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="px-3 my-4">
                <h1 className="my-4 text-xl font-medium">Top Categories</h1>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <MUILink href={category.link}>{category.name}</MUILink>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="px-3 my-4">
                <h1 className="my-4 text-xl font-medium">Top Collections</h1>
                <ul className="space-y-2">
                  {collection.map((collections, index) => (
                    <li key={index}>
                      <MUILink href={collections.link}>
                        {collections.name}
                      </MUILink>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className="px-3 my-4">
                <h1 className="my-4 text-xl font-medium">Contact Us</h1>
                <ul className="space-y-2">
                  <li className="text-gray-700">
                    1234 Market St, San Francisco, CA
                  </li>
                  <li className="text-gray-700">Email: support@ShopXY.com</li>
                  <li className="text-gray-700">Phone: +1 (555) 123-4567</li>
                  <div className="icons">
                    <li>
                      <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-gray-300">
                          <Facebook />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                          <Twitter />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                          <Instagram />
                        </a>
                        <a href="#" className="hover:text-gray-300">
                          <LinkedIn />
                        </a>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div className="py-2 text-center">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} ShopXY. All rights reserved.
          </p>
        </div>
      </Container>
    </CustomBox>
  );
};

export default Footer;

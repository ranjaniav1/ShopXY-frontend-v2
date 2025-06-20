'use client';

import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { webSettings } = useTheme();

  const categories = [
    { name: "Electronics", link: "/categories/1/electronics" },
    { name: "Jewellery & Accessories", link: "/categories/2/Jewellery-and-Accessories" },
    { name: "Home & Kitchen", link: "/categories/3/Home-and-Kitchen" },
    { name: "Bags & Footwear", link: "/categories/4/Bags-and-Footwear" },
    { name: "Baby Products", link: "/categories/5/babies-products" },
    { name: "Beverages", link: "/categories/6/food-Beverages" },
    { name: "Sport Outdoor", link: "/categories/7/Sports-Outdoors" },
    { name: "Pet Supplies", link: "/categories/8/Pet-Supplies" },
    { name: "Stationary", link: "/categories/9/Stationary" },
  ];

  const collection = [
    { name: "Mobile Phones", link: "/categories/collections/101/mobile-phones" },
    { name: "Laptops", link: "/categories/collections/102/laptops" },
    { name: "Tablets", link: "/categories/collections/103/tablets" },
    { name: "Camera", link: "/categories/collections/104/Camera" },
    { name: "Headphones", link: "/categories/collections/105/headphones" },
    { name: "Smart Watch", link: "/categories/collections/106/smart-watch" },
  ];

  return (
    <footer className="bg-body border-t border-gray-200 text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">ShopXY</h2>
            <p>
              At ShopXY, you can find all your favorite products in one place,
              from home essentials to the latest gadgets. We aim to provide
              you with the best shopping experience.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-medium mb-4">Top Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link href={cat.link} className="hover:text-primary">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xl font-medium mb-4">Top Collections</h3>
            <ul className="space-y-2">
              {collection.map((col, index) => (
                <li key={index}>
                  <Link href={col.link} className="hover:text-primary">{col.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info + Social */}
          <div>
            <h3 className="text-xl font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>{webSettings?.address || "1234 Market St, San Francisco, CA"}</li>
              <li>Email: {webSettings?.email || "support@shopxy.com"}</li>
              <li>Phone: {webSettings?.phone || "+1 (555) 123-4567"}</li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {webSettings?.facebook && (
                <a href={webSettings.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {webSettings?.twitter && (
                <a href={webSettings.twitter} aria-label="Twitter" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {webSettings?.instagram && (
                <a href={webSettings.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {webSettings?.linkedin && (
                <a href={webSettings.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShopXY. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

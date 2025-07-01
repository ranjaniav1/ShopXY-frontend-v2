"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"; // ✅ Lucide icons
import { useTheme } from "@/app/context/ThemeContext";

const Footer = () => {
  const { webSettings } = useTheme();

  const footerLinks = webSettings?.footerLinks || [];
  const socialLinks = webSettings?.socialLinks || [];
  const contact = webSettings?.contactInfo || {};

  return (
    <footer className="bg-body text-tsecondary w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            {webSettings?.logo && (
              <img
                src={webSettings.logo}
                alt="Logo"
                className="h-14 mb-4 object-contain"
              />
            )}
            <p className="text-sm">
              {webSettings?.description || "Your one-stop eCommerce solution."}
            </p>
          </div>

          {/* Top Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Our Top Links</h2>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link._id}>
                  <a
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              {contact.address && <li>{contact.address}</li>}
              {contact.email && <li>Email: {contact.email}</li>}
              {contact.phone && <li>Phone: {contact.phone}</li>}
            </ul>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((item) => {
                const iconMap = {
                  facebook: <Facebook size={20} />,
                  twitter: <Twitter size={20} />,
                  instagram: <Instagram size={20} />,
                  linkedin: <Linkedin size={20} />,
                };
                return (
                  <a
                    key={item._id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {iconMap[item.type]}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            {webSettings?.footerText ||
              `© ${new Date().getFullYear()} eShop. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

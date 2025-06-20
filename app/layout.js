"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  console.log("running")
  return (
    <html lang="en">
      <body className={`${inter.className} bg-body min-h-screen`}>
        <UserProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Toaster position="bottom-center" />
              <I18nextProvider i18n={i18n}>
                {/* Navigation */}
                <Navigation />

                {/* Content Container */}
                <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-[30px] pb-[50px]">
                  {children}
                </div>

                {/* Footer (optional) */}
                {/* <Footer /> */}
              </I18nextProvider>
            </ThemeProvider>
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  );
}

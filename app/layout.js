"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from "./context/LanguageContext";
import NavigationEventsHandler from "./Common/NavigationEventHandler";
import { LoadingProvider } from "./context/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-body  min-h-screen`}>
        <LoadingProvider>

          <NavigationEventsHandler />
          <UserProvider>

            <ThemeProvider>
              <LanguageProvider>

                  <Toaster position="bottom-center" />
                  <I18nextProvider i18n={i18n}>
                    <Navigation />
                    <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-10 md:py-12">

                      {children}
                    </div>
                    {/* <Footer /> */}
                  </I18nextProvider>
              </LanguageProvider>
            </ThemeProvider>
          </UserProvider>
        </LoadingProvider>

      </body>
    </html >
  );
}



// "use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import ClientToaster from "./Common/ClientToaster";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });



export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-body min-h-screen`}>
        <UserProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ClientToaster />
              <Analytics/>
              <Navigation />
              <div className="pt-[80px]  mx-auto  pb-8 sm:pt-[73px]">
                {children}
              </div>
              <Footer/>
            </LanguageProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}

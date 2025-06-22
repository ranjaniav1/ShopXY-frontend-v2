"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import { Container, } from "@mui/material";
import "./Styles/styles.scss";
import { ProviderStore } from "./redux/storeProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-body text-white min-h-screen`}>
        <UserProvider>

          <ThemeProvider>
            <LanguageProvider>

              <ProviderStore>
                <Toaster position="bottom-center" />
                <I18nextProvider i18n={i18n}>
                  {/* <NavigationEventsHandler /> */}
                  <Navigation />
                  <Container
                    maxWidth="xl"
                    sx={{
                      marginY: {
                        xs: "12%",//mobile devices
                        sm: "7%",// tablets
                        md: "6%", // small desktops
                        lg: "6%",//medium desktops
                        xl: "4%", // large desktops
                      },
                      paddingTop: "30px", // adjust based on the height of your nav
                    }}
                  >
                    {children}
                  </Container>
                  {/* <Footer /> */}
                </I18nextProvider>
              </ProviderStore>
            </LanguageProvider>
          </ThemeProvider>
        </UserProvider>

      </body>
    </html >
  );
}



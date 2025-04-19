"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import {Container, CssBaseline, ThemeProvider } from "@mui/material";
import "./Styles/styles.scss";
import { darkTheme, lightTheme } from "./Styles/theme";
import { useSelector } from "react-redux";
import { ProviderStore } from "./redux/storeProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderStore>
          <Toaster position="bottom-center" />
          <I18nextProvider i18n={i18n}>
            <ThemeSelector>
              <CssBaseline />
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
              <Footer />
            </ThemeSelector>
          </I18nextProvider>
        </ProviderStore>
      </body>
    </html>
  );
}

function ThemeSelector({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}

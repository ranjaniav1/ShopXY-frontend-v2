"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import {
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Provider } from "react-redux";
import "./Styles/styles.scss";
import { darkTheme, lightTheme } from "./Styles/theme";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const ThemeWrapper = ({ children }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.style.setProperty('--primary', '#01070d');
    } else {
      document.documentElement.style.setProperty('--primary', '#f1f2f4');
    }
  }, [themeMode]);
  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeWrapper>
            <Navigation />
            <Container
              maxWidth="xl"
              sx={{
                marginTop: {
                  xs: "20%", // mobile devices
                  sm: "11%", // tablets
                  md: "9%", // small desktops
                  lg: "7%", // medium desktops
                  xl: "5%", // large desktops
                },
              }}
            >
              {children}
            </Container>
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

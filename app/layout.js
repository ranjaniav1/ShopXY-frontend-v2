"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import "./Styles/styles.scss";
import { darkTheme, lightTheme } from "./Styles/theme";
import { useSelector } from "react-redux";
import { ProviderStore } from "./redux/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderStore>
          <ThemeSelector>
            <CssBaseline />
            <Navigation />
            <Container
              maxWidth="xl"
              sx={{
                marginTop: {
                  xs: "6%", // mobile devices
                  sm: "3%", // tablets
                  md: "2%", // small desktops
                  lg: "2%", // medium desktops
                  xl: "1.5%" // large desktops
                }
              }}
            >
              {children}
            </Container>
          </ThemeSelector>
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

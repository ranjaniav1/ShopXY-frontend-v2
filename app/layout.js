'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Components/Navigation";
import { Container, ThemeProvider } from "@mui/material";
import { Provider, useSelector } from 'react-redux';
import './Styles/styles.scss';
import { darkTheme, lightTheme } from "./Styles/theme";
import { store } from "./redux/store";

const inter = Inter({ subsets: ["latin"] });


const ThemeWrapper = ({ children }) => {
  const themeMode = useSelector((state) => state.mode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}> {/* Wrap with Provider */}
          <ThemeWrapper>
            <Navigation />
            <Container maxWidth="xl" sx={{
              marginTop: {
                xs: '20%',  // mobile devices
                sm: '11%',  // tablets
                md: '9%',   // small desktops
                lg: '7%',   // medium desktops
                xl: '5%'    // large desktops
              }
            }}>
              {children}
            </Container>
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}

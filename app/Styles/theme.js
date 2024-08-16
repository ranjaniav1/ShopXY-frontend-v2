// theme.js
import { createTheme } from "@mui/material/styles";

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#22aa99"
    },
    background: {
      default: "#fefefe",
      main: "#ffffff",
      secondary: "#F1F0F0"
    },
    button: {
      background: "#22aa99",
      color: "#ffffff",
      hover: "#2DAC77;"
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
      disabled: "#999999"
    },
    card: {
      background: "#ffffff",
      border: "#dddddd",
      hover: "#f5f5f5"
    },
   
  }
});

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000"
    },
    background: {
      default: "#0C2233",
      main: "#065471",
      secondary: "#0C2233"
    },
    button: {
      background: "#22aa99",
      color: "#ffffff",
      hover: "#2DAC77;"
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#b0b0b0",
      disabled: "#7d7d7d"
    },
    card: {
      background: "#2c2c2c",
      border: "#444444",
      hover: "#333333"
    },
  },

});

export { lightTheme, darkTheme };

import { createTheme } from "@mui/material/styles";

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e9b82" // A more vibrant green for primary
    },
    background: {
      default: "#f7f7f7", // Slightly lighter for modern look
      main: "#ffffff",
      secondary: "#e8e8e8", // Softer secondary background
      nav: "#ffffff",
      body: "#f5f5f5" // Consistent light gray for body
    },
    button: {
      color: "#fff",
      background: "#22aa99",
      hover: "#22aa99"
    },
    text: {
      primary: "#333333", // Dark gray for strong readability
      secondary: "#5a5a5a", // Softer gray for secondary text
      disabled: "#a0a0a0" // Light gray for disabled
    },
    card: {
      border: "#22aa99",
      hover: "#22aa99",
      background: "#ffffff",
      text: "#495057" // Slightly softer black for card text
    }
  }
});

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0d7377" // Deep teal for modern dark contrast
    },
    background: {
      default: "#0e0e0e", // True dark background for better contrast
      main: "#1f1f1f",
      secondary: "#16222a", // Darker secondary for better focus
      nav: "#1f1f1f",
      body: "#121212" // Deep black for body background
    },
    button: {
      color: "#fff",
      background: "#22aa99",
      hover: "#22aa99"
    },
    text: {
      primary: "#e4e4e4", // Light gray for primary text
      secondary: "#b4b4b4", // Medium gray for secondary
      disabled: "#7d7d7d" // Muted gray for disabled
    },
    card: {
      border: "#0d7377",
       hover: "#14ffec",
      background: "#1e1e1e",
      text: "#f8f8f8"
    }
  }
});

export { lightTheme, darkTheme };

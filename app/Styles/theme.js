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
      main: "#22aa99", // keep the vibrant teal for consistency
    },
    background: {
      default: "#141414", // industry standard dark base
      main: "#292f34", // main container bg
      secondary: "#2a2a2a", // for cards, inputs etc.
      nav: "#212529", // navbar area
      body: "#1a1a1a" // body bg
    },
    button: {
      color: "#ffffff",
      background: "#22aa99",
      hover: "#1e9b82" // darker on hover
    },
    text: {
      primary: "#f1f1f1", // brighter for readability
      secondary: "#cfcfcf", // softer but still visible
      disabled: "#7a7a7a"
    },
    card: {
      border: "#2f2f2f",
      hover: "#22aa99",
      background: "#40454a",
      text: "#eaeaea"
    }
  }
});

export { lightTheme, darkTheme };

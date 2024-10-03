// // theme.js
// import { createTheme } from "@mui/material/styles";

// // Light Mode Theme
// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#22aa99"
//     },
//     background: {
//       default: "#f2f1f0",
//       main: "#ffffff",
//       secondary: "#F1F0F0",
//       nav: "#ffffff",
//       body: "#f1f2f4"
//     },
//     button: {
//       background: "#22aa99",
//       color: "#ffffff",
//       hover: "#2DAC77;"
//     },
//     text: {
//       primary: "#333333",
//       secondary: "#666666",
//       disabled: "#999999"
//     },
//     card: {
//       border: "#22aa99",
//       hover: "#22aa99",
//       background: "#ffffff",
//       text: "#4b5563"
//     }
//   }
// });

// // Dark Mode Theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#000000"
//     },
//     background: {
//       default: "#010101",
//       main: "#2c3132",
//       secondary: "#0C2233",
//       nav: "#2c3132",
//       body: "#15181a"
//     },
//     button: {
//       background: "#22aa99",
//       color: "#ffffff",
//       hover: "#2DAC77;"
//     },
//     text: {
//       primary: "#e0e0e0",
//       secondary: "#b0b0b0",
//       disabled: "#7d7d7d"
//     },
//     card: {
//       border: "#22aa99",
//       hover: "#22aa99",
//       background: "#141d1d",
//       text: "#fff"
//     }
//   }
// });

// export { lightTheme, darkTheme };
import { createTheme } from "@mui/material/styles";

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e9b82", // A more vibrant green for primary
    },
    background: {
      default: "#f7f7f7", // Slightly lighter for modern look
      main: "#ffffff",
      secondary: "#e8e8e8", // Softer secondary background
      nav: "#ffffff",
      body: "#f5f5f5", // Consistent light gray for body
    },
    button: {
      background: "#1e9b82", // Consistent with primary
      color: "#ffffff",
      hover: "#1c8f75", // Subtle hover effect
    },
    text: {
      primary: "#333333", // Dark gray for strong readability
      secondary: "#5a5a5a", // Softer gray for secondary text
      disabled: "#a0a0a0", // Light gray for disabled
    },
    card: {
      border: "#1e9b82",
      hover: "#1e9b82",
      background: "#ffffff",
      text: "#495057", // Slightly softer black for card text
    },
  },
});

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0d7377", // Deep teal for modern dark contrast
    },
    background: {
      default: "#0e0e0e", // True dark background for better contrast
      main: "#1f1f1f",
      secondary: "#16222a", // Darker secondary for better focus
      nav: "#1f1f1f",
      body: "#121212", // Deep black for body background
    },
    button: {
      background: "#0d7377", // Dark teal consistent with primary
      color: "#ffffff",
      hover: "#0c6568", // Slight hover change
    },
    text: {
      primary: "#e4e4e4", // Light gray for primary text
      secondary: "#b4b4b4", // Medium gray for secondary
      disabled: "#7d7d7d", // Muted gray for disabled
    },
    card: {
      border: "#0d7377",
      hover: "#0d7377",
      background: "#1b1b1b", // Slightly lighter than background for depth
      text: "#f0f0f0", // Lighter for good readability
    },
  },
});

export { lightTheme, darkTheme };

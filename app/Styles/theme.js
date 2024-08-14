// theme.js
import { createTheme } from '@mui/material/styles';

// Light Mode Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#22aa99',
    },
    background: {
      default: '#ffffff',
      paper: '#f2f1f0',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
    card: {
      background: '#ffffff',
      border: '#dddddd',
      hover: '#f5f5f5',
    },
    container: {
      background: '#ffffff',
      border: '#dddddd',
    },
    nav: {
      background: '#ffffff',
      text: '#333333',
      border: '#dddddd',
    },
    alert: {
      success: '#d4edda',
      error: '#f8d7da',
    },
  },
  components: {
    // You can customize MUI components here
  },
});

// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22aa99',
    },
    background: {
      default: '#1e1e1e',
      paper: '#2c2c2c',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
      disabled: '#7d7d7d',
    },
    card: {
      background: '#2c2c2c',
      border: '#444444',
      hover: '#333333',
    },
    container: {
      background: '#2c2c2c',
      border: '#444444',
    },
    nav: {
      background: '#1e1e1e',
      text: '#e0e0e0',
      border: '#444444',
    },
    alert: {
      success: '#004d00',
      error: '#660000',
    },
  },
  components: {
    // You can customize MUI components here
  },
});

export { lightTheme, darkTheme };

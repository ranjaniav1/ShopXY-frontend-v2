import { SET_THEME, TOGGLE_THEME } from '../reducer/ThemeReducer';

// Action to toggle between light and dark mode
export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

// Action to set a specific theme
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

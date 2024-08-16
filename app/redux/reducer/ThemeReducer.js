// Initial state of the theme
const initialState = {
  mode: "light" // Default mode is 'light'
};
export const TOGGLE_THEME = "themetoggle";
export const SET_THEME = "setTheme";
// Theme reducer function
export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light"
      };
    case SET_THEME:
      return {
        ...state,
        mode: action.payload
      };
    default:
      return state;
  }
};

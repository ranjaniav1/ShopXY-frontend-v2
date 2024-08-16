import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // Default theme
};

const ThemeReducer = createSlice({
  name: "theme", // name of the reducer
  initialState, // initial state
  reducers: {
    // list of reducers
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Actions generated from the reducera
export const { setTheme } = ThemeReducer.actions;

// export default reducer
export default ThemeReducer.reducer;
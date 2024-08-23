// languageSlice.js
import i18n from "@/app/i18n";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en" // Default to 'en' if nothing is stored
};
const LanguageReducer = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
      i18n.changeLanguage(action.payload);
    }
  }
});

export const { setLanguage } = LanguageReducer.actions;
export default LanguageReducer.reducer;

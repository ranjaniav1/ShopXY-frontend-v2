import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import LanguageReducer from "./LanguageReducer";

export const rootReducer = combineReducers({
  theme: ThemeReducer,
  language: LanguageReducer
});

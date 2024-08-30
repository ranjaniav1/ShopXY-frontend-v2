import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import LanguageReducer from "./LanguageReducer";
import loginReducer from "./user/loginReducer";

export const rootReducer = combineReducers({
  theme: ThemeReducer,
  language: LanguageReducer,
  auth: loginReducer
});

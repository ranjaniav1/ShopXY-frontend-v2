import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import LanguageReducer from "./LanguageReducer";
import loginReducer from "./user/loginReducer";
import cartReducer from "./cartReducer.js";
import addressReducer from "./addressReducer";

export const rootReducer = combineReducers({
  theme: ThemeReducer,
  language: LanguageReducer,
  auth: loginReducer,
  cart: cartReducer,
  address: addressReducer
});

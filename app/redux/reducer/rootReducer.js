import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import loginReducer from "./user/loginReducer";

export const rootReducer = combineReducers({
  theme: ThemeReducer,
  auth: loginReducer,
  
});

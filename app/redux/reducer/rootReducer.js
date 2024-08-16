import { combineReducers } from "redux";
import { themeReducer } from "./ThemeReducer";

export const rootReducer = combineReducers({
 theme:themeReducer
});
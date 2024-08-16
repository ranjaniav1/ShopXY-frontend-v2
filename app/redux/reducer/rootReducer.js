import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";

export const rootReducer = combineReducers({
 theme:ThemeReducer
});
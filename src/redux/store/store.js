import { createStoreHook } from "react-redux";
import { moviesReducer } from "../reducer/MovieReducer";


export const store = createStoreHook(moviesReducer);
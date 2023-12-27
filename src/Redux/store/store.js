import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./slice.js";

export const store = configureStore({
  reducer: {
    searchedText: SearchSlice,
  },
});

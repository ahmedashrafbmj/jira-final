import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "../src/Redux/store/slice.js";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { store } from "./Redux/store/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>
);

reportWebVitals();

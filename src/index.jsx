import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

// UPDATED: Import JSX files instead of JS files
import App from "./components/App.jsx";
import Credit from "./components/Credit.jsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    <Credit />
  </StrictMode>,
  rootElement
);

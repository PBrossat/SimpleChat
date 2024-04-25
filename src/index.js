import React from "react";
import ReactDOM from "react-dom/client";
import "./style/Index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";

// id="root" is the div element in public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

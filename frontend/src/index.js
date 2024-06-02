import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { removeUser } from "./repository/credentials";
import { initProducts } from "./repository/products"; 

removeUser();
initProducts(); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

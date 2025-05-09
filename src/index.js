import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.css";
import LoginPage from "./Login/LoginPage";
import NewUsers from "./Dashboard/NewUsers";

import CafeModal from "./Cafe/CafeModal";
import UserModal from "./User/UserModal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();

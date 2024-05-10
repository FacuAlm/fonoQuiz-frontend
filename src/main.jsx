import React from "react";
import ReactDOM from "react-dom/client";
import { PacientesProvider } from "./context/PacientesProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "./index.css";
import Router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PacientesProvider>
        <Router />
      </PacientesProvider>
    </AuthProvider>
  </React.StrictMode>
);

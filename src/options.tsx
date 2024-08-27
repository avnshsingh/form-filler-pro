import React from "react";
import ReactDOM from "react-dom/client";
import OptionsPage from "./OptionsPage";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptionsPage />
    <Toaster />
  </React.StrictMode>
);

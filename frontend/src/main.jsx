import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import "@fontsource-variable/quicksand";
import "./css/index.css";
import { BrowserRouter } from "react-router";
import { routes } from "./routes";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>{routes}</BrowserRouter>
  </StrictMode>,
);

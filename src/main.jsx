import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CompareProvider from "./context/CompareContext.jsx";
import FavouriteProvider from "./context/FavouriteContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavouriteProvider>
      <CompareProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CompareProvider>
    </FavouriteProvider>
  </StrictMode>
);

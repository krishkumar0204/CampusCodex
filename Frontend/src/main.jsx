import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 900,
          style: {
            color: "#333",
            borderRadius: "5px",
            margin: "65px 0 0 0 ",
            padding: "12px 16px",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GifProvider } from "./context/gifContext/GifContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GifProvider>
      <App />
    </GifProvider>
  </React.StrictMode>
);

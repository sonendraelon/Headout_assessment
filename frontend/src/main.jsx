import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import global styles
import App from "./App.jsx"; // Import the main App component

// Create the root element and render the App component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

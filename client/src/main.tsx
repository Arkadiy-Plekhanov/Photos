import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add debug logging
console.log("main.tsx loaded");
console.log("Document ready state:", document.readyState);
console.log("DOM content loaded");

const initializeApp = () => {
  const rootElement = document.getElementById("root");
  console.log("Root element:", rootElement);
  
  if (rootElement) {
    console.log("Creating React root...");
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered");
  } else {
    console.error("Root element not found");
    // Create fallback content
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1>Loading Error</h1>
        <p>Unable to find root element. Please refresh the page.</p>
        <button onclick="window.location.reload()">Refresh</button>
      </div>
    `;
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
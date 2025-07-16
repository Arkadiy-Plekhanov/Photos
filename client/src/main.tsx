// Fix for React dispatcher error - ensure React is loaded first
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

// Ensure React is available globally before any hooks are used
window.React = React;

// Import App after React is globally available
const loadApp = async () => {
  try {
    const { default: App } = await import("./App");
    
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to load application:", error);
    // Fallback UI
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1>Arcadia Photography</h1>
          <p style="color: red;">Application failed to load. Please refresh the page.</p>
          <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      `;
    }
  }
};

// Load the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadApp);
} else {
  loadApp();
}

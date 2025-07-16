import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal test to isolate the React dispatcher issue
const MinimalApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Arcadia Photography</h1>
      <p>Application is loading correctly without hooks...</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <strong>Status:</strong> React is working properly
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<MinimalApp />);
} else {
  console.error("Root element not found");
}

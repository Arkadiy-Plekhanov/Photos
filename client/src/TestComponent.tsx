
import React from 'react';

const TestComponent = () => {
  console.log("TestComponent rendering");
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1>React is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default TestComponent;

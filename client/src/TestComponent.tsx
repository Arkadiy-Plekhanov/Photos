
import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>
        Test Component Loaded Successfully
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        If you can see this, React is working properly.
      </p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#007bff', 
        color: 'white', 
        borderRadius: '5px' 
      }}>
        Timestamp: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default TestComponent;

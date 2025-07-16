
import React from 'react';

const TestComponent: React.FC = () => {
  console.log('TestComponent rendering...');
  
  React.useEffect(() => {
    console.log('TestComponent mounted successfully');
    document.title = 'Test Component - Working';
  }, []);

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
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#28a745', 
        color: 'white', 
        borderRadius: '5px' 
      }}>
        Environment: {process.env.NODE_ENV || 'unknown'}
      </div>
    </div>
  );
};

export default TestComponent;

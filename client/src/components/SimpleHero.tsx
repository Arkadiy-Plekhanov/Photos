import React from 'react';

const SimpleHero = () => {
  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1>Simple Hero Test</h1>
      <img 
        src="/images/services/wedding.jpg" 
        alt="Wedding"
        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
        onLoad={() => console.log('Image loaded successfully')}
        onError={(e) => console.error('Image failed to load:', e)}
      />
      <p>If you can see this and the image above, the basic setup is working.</p>
    </div>
  );
};

export default SimpleHero;
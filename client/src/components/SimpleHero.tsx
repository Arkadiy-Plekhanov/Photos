const SimpleHero = () => {
  console.log('SimpleHero component rendering');
  
  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      backgroundColor: '#ff0000', 
      padding: '20px',
      border: '5px solid blue',
      color: 'white',
      fontSize: '24px'
    }}>
      <h1 style={{ color: 'white', fontSize: '36px' }}>SIMPLE HERO TEST - VISIBLE NOW</h1>
      <div style={{ backgroundColor: 'green', padding: '10px', margin: '10px 0' }}>
        <p>This green box should be visible if React is working</p>
      </div>
      <img 
        src="/images/services/wedding.jpg" 
        alt="Wedding"
        style={{ 
          width: '300px', 
          height: '200px', 
          objectFit: 'cover',
          border: '3px solid yellow'
        }}
        onLoad={() => console.log('Image loaded successfully')}
        onError={(e) => {
          console.error('Image failed to load:', e);
          console.log('Trying to load from:', '/images/services/wedding.jpg');
        }}
      />
      <p style={{ color: 'white', fontSize: '20px' }}>If you can see this RED section, React is working!</p>
    </div>
  );
};

export default SimpleHero;
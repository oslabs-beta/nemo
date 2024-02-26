import React, { useState, useEffect } from 'react';
import Navbar from './NavBar.jsx';
import MainContainer from './MainContainer.jsx';

const App = () => {
  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    document.body.style.margin = '0';
  }, []);

  return (
    <div style={{ backgroundColor: '#081020', minHeight: '100vh' }}>
      <Navbar setActiveButton={setActiveButton} />
      <MainContainer activeButton={activeButton} />
    </div>
  );
};

export default App;

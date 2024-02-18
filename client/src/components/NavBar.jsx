import React, { useState } from 'react';

const sidebarStyle = {
  height: '100vh',
  width: '250px',
  position: 'fixed',
  left: 0,
  top: 0,
  backgroundColor: '#0C1428',
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const buttonStyle = {
  padding: '10px 15px',
  textAlign: 'left',
  color: '#E3F1FC',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#0C1428',
  width: '100%',
  textTransform: 'uppercase',
  marginBottom: '5px',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  fontFamily: '"Roboto", sans-serif',
  fontWeight: '900',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#081020',
  color: '#FF743E',
};

const Navbar = ({ setActiveButton }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButtonLocally] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    setActiveButtonLocally(buttonNumber);
  };

  return (
    <div>
      <div style={sidebarStyle}>
        <button
          style={
            activeButton === 1 || hoveredButton === 1
              ? activeButtonStyle
              : buttonStyle
          }
          onClick={() => handleButtonClick(1)}
          onMouseEnter={() => setHoveredButton(1)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          WELCOME
        </button>
        <button
          style={
            activeButton === 2 || hoveredButton === 2
              ? activeButtonStyle
              : buttonStyle
          }
          onClick={() => handleButtonClick(2)}
          onMouseEnter={() => setHoveredButton(2)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          CLUSTER
        </button>
        <button
          style={
            activeButton === 3 || hoveredButton === 3
              ? activeButtonStyle
              : buttonStyle
          }
          onClick={() => handleButtonClick(3)}
          onMouseEnter={() => setHoveredButton(3)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          NODES
        </button>
        <button
          style={
            activeButton === 4 || hoveredButton === 4
              ? activeButtonStyle
              : buttonStyle
          }
          onClick={() => handleButtonClick(4)}
          onMouseEnter={() => setHoveredButton(4)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          PODS
        </button>
        <button
          style={
            activeButton === 5 || hoveredButton === 5
              ? activeButtonStyle
              : buttonStyle
          }
          onClick={() => handleButtonClick(5)}
          onMouseEnter={() => setHoveredButton(5)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Cluster Structure
        </button>
      </div>
    </div>
  );
};

export default Navbar;

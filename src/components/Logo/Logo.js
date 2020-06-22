import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2 logo" options={{ max : 35 }} style={{ height: 120, width: 120 }} >
      <div className="Tilt-inner"> 
        <img src={brain} alt="Brain logo" style={{paddingTop: '20px'}} />
      </div>
      </Tilt>
    </div>
  )
}

export default Logo;
import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header_logo" alt="logo" />
      Random Teams Generator
    </div>
  );
};

export default Header;

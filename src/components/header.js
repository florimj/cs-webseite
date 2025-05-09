import React from 'react';
import { FaHome, FaSitemap, FaTree, FaInfoCircle, FaEnvelope } from 'react-icons/fa';      

function Header({ onNavigate }) {
  return (
    <header className="main-header">
      <h1>Corporate Startup Governance Model</h1>
      <nav>
        <button onClick={() => onNavigate('landing')}><FaHome /> Home</button>
        <button onClick={() => onNavigate('dashboard')}><FaSitemap /> Dashboard</button>
        <button onClick={() => onNavigate('baum')}><FaTree /> Strategy Decision Tree</button>
        <button onClick={() => onNavigate('about')}><FaInfoCircle /> About Us</button>
        <button onClick={() => onNavigate('contact')}><FaEnvelope /> Contact</button>
      </nav>
    </header>
  );
}
export default Header;
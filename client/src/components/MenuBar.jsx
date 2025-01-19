import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    switch(path) {
      case 'save':
        console.log('Save game');
        break;
      case 'load':
        console.log('Load game');
        break;
      case 'rules':
        navigate('/rules');
        break;
      case 'chars':
        navigate('/characters');
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="menu-area">
        <div 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>
      <div className={`menu-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <span 
          className="menu-item" 
          onClick={() => handleNavigation('save')}
        >
          {`> Save`}
        </span>
        <span 
          className="menu-item" 
          onClick={() => handleNavigation('load')}
        >
          {`> Load`}
        </span>
        <span 
          className="menu-item" 
          onClick={() => handleNavigation('rules')}
        >
          {`> Rules`}
        </span>
        <span 
          className="menu-item" 
          onClick={() => handleNavigation('chars')}
        >
          {`> Chars`}
        </span>
      </div>
    </>
  );
}

export default MenuBar; 
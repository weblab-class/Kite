import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';

function Start() {
  const navigate = useNavigate();

  const handleRulesClick = () => {
    navigate('/rules');  // You'll need to create this route
  };

  const handleCharactersClick = () => {
    navigate('/characters');  // You'll need to create this route
  };

  return (
    <div className="v14_44">
      <div className="v14_45" />
      <span 
        className="v14_47" 
        onClick={handleCharactersClick}
        role="button"
        tabIndex={0}
      >
        Characters
      </span>
      <span 
        className="v14_46" 
        onClick={handleRulesClick}
        role="button"
        tabIndex={0}
      >
        Rules
      </span>
    </div>
  );
}

export default Start; 
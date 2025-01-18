import React from 'react';
import { useNavigate } from 'react-router-dom';
import './rules.css';

function Rules() {
  const navigate = useNavigate();

  return (
    <div className="v10_12">
      <span className="v13_31">Rules</span>
      <div className="v13_35">
        <span className="v13_34">
          Welcome to the city of fog in the 1920s. You are a private investigator hired to solve a mysterious murder... But the truth may become your deepest nightmare.
          
          To begin playing, click on "Chars" to create characters. Customize the skill sets as instructed.
        </span>

      </div>
      <span 
          className="back-button"
          onClick={() => navigate('/start')}
        >
          Back
        </span>
      <div className="name"></div>
    </div>
  );
}

export default Rules; 
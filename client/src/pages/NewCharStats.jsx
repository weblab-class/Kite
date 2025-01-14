import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newCharStats.css';

function NewCharStats() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(495); // 425+70

  const handleDiceClick = () => {
    // Add dice rolling logic here
    console.log('Rolling dice...');
  };

  const handleNext = () => {
    navigate('/next-step'); // Replace with your next route
  };

  return (
    <div className="v17_7">
      <div 
        className="v22_23" 
        onClick={handleDiceClick}
        role="button"
        tabIndex={0}
      />
      <div className="v22_24" />
      <div className="v22_50">
        <span className="v22_51">Dexterity</span>
        <span className="v22_52">Education</span>
        <span className="v22_53">Power</span>
        <span className="v22_54">Size</span>
        <span className="v22_59">Wisdom/Sanity</span>
        <span className="v22_55">Appearance</span>
        <span className="v22_56">Constitution</span>
        <span className="v22_57">Strength</span>
        <span className="v22_61">80</span>
        <span className="v22_63">40</span>
        <span className="v22_64">50</span>
        <span className="v22_66">45</span>
        <span className="v22_67">60</span>
        <span className="v22_69">40</span>
        <span className="v22_70">50</span>
        <span className="v22_71">60</span>
        <span className="v22_72">70</span>
        <span className="v22_60">Luck</span>
      </div>
      <span className="v22_26">
        Click on the dice to roll the stats for your character
      </span>
      <span className="v22_62">Total: {total}</span>
      <span 
        className="v24_88" 
        onClick={handleNext}
        role="button"
        tabIndex={0}
      >
        Next
      </span>
    </div>
  );
}

export default NewCharStats; 
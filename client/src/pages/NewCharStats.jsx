import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCharStats() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(495);

  const handleDiceClick = () => {
    console.log("Rolling dice...");
  };

  const handleNext = () => {
    navigate("/new-character-skills");
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Character Stats</h1>
        <div className="character-form">
          <p className="rules-text">
            Click on the dice to roll the stats for your character
          </p>
          <div className="stat-container">
            <span className="rules-text">Dexterity</span>
            <span className="rules-text">80</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Education</span>
            <span className="rules-text">40</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Power</span>
            <span className="rules-text">50</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Size</span>
            <span className="rules-text">45</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Wisdom/Sanity</span>
            <span className="rules-text">60</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Appearance</span>
            <span className="rules-text">40</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Constitution</span>
            <span className="rules-text">50</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Strength</span>
            <span className="rules-text">60</span>
          </div>
          <div className="stat-container">
            <span className="rules-text">Luck</span>
            <span className="rules-text">70</span>
          </div>
          <p className="rules-text">Total: {total}</p>
          <button className="character-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCharStats;

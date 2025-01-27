import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./newCharStats.css";
import MenuBar from "../components/MenuBar";
import { post } from "../utilities.js";

function NewCharStats() {
  const navigate = useNavigate();
  const location = useLocation();
  const { character, isEditing } = location.state || {};
  const [stats, setStats] = useState(character?.stats || {
    strength: 0,
    constitution: 0,
    size: 0,
    dexterity: 0,
    appearance: 0,
    education: 0,
    wisdom: 0,
    power: 0,
    luck: 0,
  });

  // Calculate total whenever stats change
  const total = Object.values(stats).reduce((sum, curr) => sum + curr, 0);

  const generateRandomStat = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleDiceClick = () => {
    if (isEditing) {
      alert("Stats cannot be modified after character creation");
    }
    
    setStats({
      strength: generateRandomStat(15, 90),
      constitution: generateRandomStat(15, 90),
      size: generateRandomStat(40, 90),
      dexterity: generateRandomStat(15, 90),
      appearance: generateRandomStat(15, 90),
      education: generateRandomStat(40, 90),
      wisdom: generateRandomStat(15, 90),
      power: generateRandomStat(15, 90),
      luck: generateRandomStat(15, 90),
    });
  };

  const handleNext = () => {
    if (isEditing) {
      alert("Stats cannot be modified after character creation");
    }

    // Validate stats only if creating new character
    if (!isEditing && Object.values(stats).some((stat) => stat === 0)) {
      alert("Please roll the dice to set all stats");
      return;
    }

    post("/api/new-character", { stats: stats })
      .then((updatedCharacter) => {
        navigate("/new-character-skills", { 
          state: { character: updatedCharacter, isEditing } 
        });
      })
      .catch((error) => {
        console.error("Error saving stats:", error);
      });
  };

  return (
    <div className="v17_7">
      <MenuBar />
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
        <span className="v22_61">{stats.dexterity}</span>
        <span className="v22_63">{stats.education}</span>
        <span className="v22_64">{stats.power}</span>
        <span className="v22_66">{stats.size}</span>
        <span className="v22_67">{stats.wisdom}</span>
        <span className="v22_69">{stats.appearance}</span>
        <span className="v22_70">{stats.constitution}</span>
        <span className="v22_71">{stats.strength}</span>
        <span className="v22_72">{stats.luck}</span>
        <span className="v22_60">Luck</span>
      </div>
      <span className="v22_26">
        Click on the dice to roll the stats for your character
      </span>
      <span className="v22_62">Total: {total}</span>
      <span className="v24_88" onClick={handleNext} role="button" tabIndex={0}>
        Next
      </span>
    </div>
  );
}

export default NewCharStats;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newCharStats.css";
import MenuBar from "../components/MenuBar";

function NewCharStats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    strength: 60, // Initial placeholder values
    constitution: 50,
    size: 50,
    dexterity: 80,
    appearance: 40,
    education: 45,
    wisdom: 60,
    power: 40,
    luck: 70,
  });

  // Calculate total whenever stats change
  const total = Object.values(stats).reduce((sum, curr) => sum + curr, 0);

  const generateRandomStat = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleDiceClick = () => {
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

  const handleNext = async () => {
    try {
      const response = await fetch("/api/new-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_info: {
            stats: stats,
            // You might want to add other character info here
            // like character_name and player_name
            character_name: "", // You'll need to collect this from the user
            player_name: "", // You'll need to collect this from the user
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save character stats");
      }

      // If successful, navigate to the next page
      navigate("/new-character-skills");
    } catch (error) {
      console.error("Error saving character stats:", error);
      // You might want to show an error message to the user here
    }
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

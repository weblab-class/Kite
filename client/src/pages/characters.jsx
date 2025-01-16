import React from "react";
import { useNavigate } from "react-router-dom";
import octopusImage from "../images/octopus.png";

const CharacterButton = ({ name, isActive, onClick }) => (
  <button
    className={`character-button ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {name}
  </button>
);

function Characters() {
  const navigate = useNavigate();

  const handleCharacterSelect = (characterName) => {
    // TODO: Implement character selection logic
    console.log(`Selected character: ${characterName}`);
  };

  const handleCreateNewCharacter = () => {
    navigate("/new-character-player-info");
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Choice ur character</h1>
        <div className="character-section">
          <div className="octopus-icon" />
          <CharacterButton
            name="Alicia"
            isActive={true}
            onClick={() => handleCharacterSelect("Alicia")}
          />
          <CharacterButton
            name="Suzie"
            isActive={false}
            onClick={() => handleCharacterSelect("Suzie")}
          />
          <button
            className="create-character-button"
            onClick={handleCreateNewCharacter}
          >
            Create New Character
          </button>
        </div>
      </div>
    </div>
  );
}

export default Characters;

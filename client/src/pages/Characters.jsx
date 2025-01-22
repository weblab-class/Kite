import React, { useState, useEffect } from "react";
import "./characters.css";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utilities";
import MenuBar from "../components/MenuBar";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const navigate = useNavigate();

  const handleCreateNewCharacterClick = () => {
    navigate("/new-character-player-info");
  };

  const handleCharacterSelect = (characterId) => {
    console.log("Selected character:", characterId);
    post("/api/set-current-character", { characterId: characterId })
      .then((res) => {
        console.log("Selected character:", res.currentCharacterId);
        setSelectedCharacterId(characterId);
        navigate("/story");
      })
      .catch((err) => {
        console.log("Error selecting character:", err);
      });
  };

  useEffect(() => {
    console.log("Fetching characters...");
    get("/api/characters")
      .then((characterData) => {
        console.log("Raw response:", characterData);
        setCharacters(characterData);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  let charactersList = null;
  const hasCharacters = characters.length !== 0;
  if (hasCharacters) {
    charactersList = characters.map((character) => (
      <span
        key={`Character_${character._id}`}
        className={`existing-characters ${
          character._id === selectedCharacterId ? "selected" : ""
        }`}
        onClick={() => handleCharacterSelect(character._id)}
      >
        {character.player_info.character_name}
      </span>
    ));
  } else {
    charactersList = (
      <span className="find_character">No characters found</span>
    );
  }

  return (
    <div className="v13_39">
      <MenuBar />
      <div className="v13_40">
        <div className="v13_60">
          <div className="v13_59"></div>
          {charactersList}
          <span onClick={handleCreateNewCharacterClick} className="v13_61">
            Create New Character
          </span>
        </div>
        <span className="v13_42">Choose ur character</span>
      </div>
    </div>
  );
}

export default Characters;

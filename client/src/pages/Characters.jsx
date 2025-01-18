import React, { useState, useEffect } from "react";
import "./Characters.css";
import { useNavigate } from "react-router-dom";
import { get } from "../utilities";

function Characters() {
  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();

  const handleCreateNewCharacterClick = () => {
    navigate("/new-character-player-info");
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
      <span key={`Character_${character._id}`} className="v13_51">
        {character.character_name}
      </span>
    ));
  } else {
    charactersList = <span className="find_character">
      No characters found</span>;
  }

  return (
    <div className="v13_39">
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

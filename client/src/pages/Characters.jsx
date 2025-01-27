import React, { useState, useEffect } from "react";
import "./characters.css";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utilities";
import MenuBar from "../components/MenuBar";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleCreateNewCharacterClick = () => {
    navigate("/new-character-player-info");
  };

  const handleCharacterSelect = (characterId) => {
    console.log("Selected character:", characterId);
    if (isDeleting) {
      if (window.confirm("Are you sure you want to delete this character?")) {
        post("/api/delete-character", { characterId: characterId })
          .then(() => {
            setCharacters(
              characters.filter((char) => char._id !== characterId)
            );
            setIsDeleting(false);
          })
          .catch((err) => {
            console.log("Error deleting character:", err);
            alert("Failed to delete character");
          });
      }
    } else {
      post("/api/set-current-character", { characterId: characterId })
        .then((res) => {
          console.log("Selected character:", res.currentCharacterId);
          setSelectedCharacterId(characterId);
          navigate("/character-details", { state: { characterId } });
        })
        .catch((err) => {
          console.log("Error selecting character:", err);
        });
    }
  };

  const handleDeleteMode = () => {
    setIsDeleting(true);
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
    charactersList = (
      <div className="character-list-container">
        <div className="character-list">
          {characters.map((character) => (
            <span
              key={`Character_${character._id}`}
              className={`existing-characters ${
                character._id === selectedCharacterId ? "selected" : ""
              }`}
              onClick={() => handleCharacterSelect(character._id)}
            >
              {character.player_info.character_name}
            </span>
          ))}
        </div>
      </div>
    );
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
          <span className="delete-instructions">
            {isDeleting ? "Delete Character" : "Choose ur character"}
          </span>
          <div className="v13_59"></div>
          {isDeleting ? (
            <div className="delete-instructions">
              <div className="find_character">Select a character to delete</div>
              {charactersList}
              <div className="v13_61" onClick={() => setIsDeleting(false)}>
                Cancel
              </div>
            </div>
          ) : (
            <>
              {charactersList}
              <div className="character-actions">
                <span onClick={handleCreateNewCharacterClick} className="v13_61">
                  Create New Character
                </span>
                <span onClick={handleDeleteMode} className="v13_61">
                  Delete Character
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Characters;

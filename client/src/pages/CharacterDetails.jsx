import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import "./characterDetails.css";
import { get } from "../utilities";

function CharacterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { characterId } = location.state || {};
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    get("/api/current-character")
      .then((characterData) => {
        setCharacter(characterData);
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
      });
  }, []);

  const handleOptionClick = (option) => {
    if (!character) return;

    switch (option) {
      case "info":
        navigate("/new-character-player-info", { 
          state: { character, isEditing: true } 
        });
        break;
      case "stats":
        navigate("/new-character-stats", { 
          state: { character, isEditing: true } 
        });
        break;
      case "skills":
        navigate("/new-character-skills", { 
          state: { character, isEditing: true } 
        });
        break;
      case "story":
        get(`/api/character/${characterId}/history`)
          .then((chatHistory) => {
            navigate("/story", { state: { chatHistory } });
          })
          .catch((error) => {
            console.error("Error fetching chat history:", error);
          });
        break;
      default:
        break;
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="v13_39">
      <MenuBar />
      <div className="v13_40">
        <div className="character-options">
          <span 
            className="character-option"
            onClick={() => handleOptionClick("info")}
          >
            Player Info
          </span>
          <span 
            className="character-option"
            onClick={() => handleOptionClick("stats")}
          >
            Stats
          </span>
          <span 
            className="character-option"
            onClick={() => handleOptionClick("skills")}
          >
            Skills
          </span>
          <span 
            className="character-option"
            onClick={() => handleOptionClick("story")}
          >
            Story
          </span>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails; 
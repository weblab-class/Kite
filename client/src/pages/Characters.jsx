import React from "react";
import "./characters.css";
import { useNavigate } from "react-router-dom";

function Characters() {
  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();

  const handleCreateNewCharacterClick = () => {
    navigate("/new-character-player-info");
  };

  useEffect(() => {
    get("api/characters").then((characters) => {
      setCharacters(characters);
    });
  });

  return (
    <div className="v13_39">
      <div className="v13_40">
        <div className="v13_60">
          <div className="v13_59"></div>
          <span className="v13_51">Alicia</span>
          <span className="v13_54">Suzie</span>
          <span onClick={handleCreateNewCharacterClick} className="v13_61">
            Create New Character
          </span>
        </div>
        <span className="v13_42">Choice ur character</span>
      </div>
    </div>
  );
}

export default Characters;

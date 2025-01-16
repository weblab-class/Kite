import React from "react";
import { useNavigate } from "react-router-dom";

function Story() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    switch (path) {
      case "save":
        console.log("Save game");
        break;
      case "load":
        console.log("Load game");
        break;
      case "rules":
        navigate("/rules");
        break;
      case "chars":
        navigate("/characters");
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="story-container">
          <button
            className="character-button"
            onClick={() => handleNavigation("save")}
          >
            {`> Save`}
          </button>
          <button
            className="character-button"
            onClick={() => handleNavigation("load")}
          >
            {`> Load`}
          </button>
          <button
            className="character-button"
            onClick={() => handleNavigation("rules")}
          >
            {`> Rules`}
          </button>
          <button
            className="character-button"
            onClick={() => handleNavigation("chars")}
          >
            {`> Chars`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Story;

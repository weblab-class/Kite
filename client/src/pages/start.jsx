import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  const handleRulesClick = () => {
    navigate("/rules");
  };

  const handleCharactersClick = () => {
    navigate("/characters");
  };

  return (
    <div className="page-container">
      <div className="start-background" />
      <button className="start-button" onClick={handleCharactersClick}>
        Characters
      </button>
      <button
        className="start-button"
        onClick={handleRulesClick}
        style={{ bottom: "10%" }}
      >
        Rules
      </button>
    </div>
  );
}

export default Start;

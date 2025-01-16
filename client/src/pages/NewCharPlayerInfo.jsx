import React from "react";
import { useNavigate } from "react-router-dom";

function NewCharPlayerInfo() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/new-character-stats");
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="character-form">
          <h1 className="page-title">Player Information</h1>
          <div className="form-group">
            <label className="rules-text">Player Name:</label>
            <input type="text" className="login-input" defaultValue="Test" />
          </div>
          <div className="form-group">
            <label className="rules-text">Character Name:</label>
            <input type="text" className="login-input" defaultValue="Name" />
          </div>
          <div className="form-group">
            <label className="rules-text">Age:</label>
            <input type="text" className="login-input" defaultValue="100" />
          </div>
          <div className="form-group">
            <label className="rules-text">Job:</label>
            <input
              type="text"
              className="login-input"
              defaultValue="Detective"
            />
          </div>
          <button className="character-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCharPlayerInfo;

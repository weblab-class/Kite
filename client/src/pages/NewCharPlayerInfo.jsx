import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import "./newCharPlayerInfo.css";

function NewCharPlayerInfo() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState("medium");
  const [formData, setFormData] = useState({
    characterName: "",
    age: "",
    gender: "",
    playerName: "",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleNext = () => {
    navigate("/new-character-stats");
  };

  return (
    <div className="character-page">
      <div className="character-form">
        <FormField
          label="Character Name:"
          value={formData.characterName}
          onChange={handleInputChange("characterName")}
          position="character-name"
        />
        <FormField
          label="Age:"
          value={formData.age}
          onChange={handleInputChange("age")}
          position="age"
        />
        <div className="form-field">
          <label className="form-label">Job:</label>
          <div className="job-options">
            <label className="job-option">
              <input
                type="radio"
                name="job"
                value="medium"
                checked={selectedJob === "medium"}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="job-radio"
              />
              <span className="job-label-text">Medium</span>
            </label>
            <label className="job-option">
              <input
                type="radio"
                name="job"
                value="detective"
                checked={selectedJob === "detective"}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="job-radio"
              />
              <span className="job-label-text">Detective</span>
            </label>
          </div>
        </div>
        <FormField
          label="Gender:"
          value={formData.gender}
          onChange={handleInputChange("gender")}
          position="gender"
        />
        <FormField
          label="Player Name:"
          value={formData.playerName}
          onChange={handleInputChange("playerName")}
          position="player-name"
        />
      </div>
      <span
        className="next-button"
        onClick={handleNext}
        role="button"
        tabIndex={0}
      >
        Next
      </span>
    </div>
  );
}

export default NewCharPlayerInfo;

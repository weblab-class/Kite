import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormField from "../components/FormField";
import "./newCharPlayerInfo.css";
import { post } from "../utilities.js";
import MenuBar from "../components/MenuBar";

function NewCharPlayerInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { character, isEditing } = location.state || {};
  const [selectedJob, setSelectedJob] = useState(character?.player_info?.job || "medium");
  const [formData, setFormData] = useState({
    characterName: character?.player_info?.character_name || "",
    age: character?.player_info?.age || "",
    gender: character?.player_info?.gender || "",
    playerName: character?.player_info?.player_name || "",
    job: character?.player_info?.job || "medium",
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
    setFormData({
      ...formData,
      job: e.target.value,
    });
  };

  const handleNext = () => {
    // Validate form data
    if (
      !formData.characterName ||
      !formData.age ||
      !formData.gender ||
      !formData.playerName
    ) {
      alert("Please enter every field");
      return;
    }

    post("/api/new-character", { new_character_info: formData });
    navigate("/new-character-stats");
  };

  return (
    <div className="character-page">
      <MenuBar />
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
                onChange={(e) => handleJobChange(e)}
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
                onChange={(e) => handleJobChange(e)}
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

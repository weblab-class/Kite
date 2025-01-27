import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Clear current character when starting new character creation
    if (!isEditing) {
      post("/api/start-new-character").catch(error => {
        console.error("Error starting new character:", error);
      });
    }
  }, [isEditing]);

  const handleInputChange = (field) => (event) => {
    let value = event.target.value;
    
    // Special handling for age field
    if (field === "age") {
      // Remove any non-numeric characters
      value = value.replace(/[^0-9]/g, '');
      
      if (value && isNaN(parseInt(value))) {
        alert("Please enter a valid number for age");
        return;
      }
    }

    setFormData({
      ...formData,
      [field]: value,
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
    if (isEditing) {
      alert("Character information cannot be modified after creation");
    }

    // Validate form data
    if (!formData.characterName || !formData.age || !formData.gender || !formData.playerName) {
      alert("Please enter every field");
      return;
    }

    // Enhanced age validation with better user feedback
    const age = parseInt(formData.age);
    if (isNaN(age)) {
      alert("Please enter a number for the character's age");
      return;
    }

    // Convert age to number before sending
    const characterInfo = {
      ...formData,
      age: age
    };

    post("/api/new-character", { new_character_info: characterInfo })
      .then((updatedCharacter) => {
        navigate("/new-character-stats", { 
          state: { character: updatedCharacter, isEditing } 
        });
      })
      .catch((error) => {
        console.error("Error saving character info:", error);
        alert("Error saving character info. Please try again.");
      });
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
          type="number"
          min="1"
          max="120"
          placeholder="Enter age (1-120)"
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
      {isEditing && (
        <span
          className="back-button"
          onClick={() => navigate("/character-details")}
          role="button"
          tabIndex={0}
        >
          Back to Character
        </span>
      )}
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

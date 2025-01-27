import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./newCharSkills.css";
import MenuBar from "../components/MenuBar";
import { post } from "../utilities.js";

function NewCharSkills() {
  const navigate = useNavigate();
  const location = useLocation();
  const { character, isEditing } = location.state || {};

  // Initialize skillPoints based on character's education
  const [skillPoints, setSkillPoints] = useState(() => {
    if (character?.stats?.education) {
      return character.stats.education * 4;
    }
    return 0;
  });

  // Initialize skills with existing values or defaults
  const [skills, setSkills] = useState(() => {
    const defaultSkills = {
      libraryUse: 0,
      listen: 0,
      firstAid: 0,
      medicine: 0,
      fighting: 0,
      psychology: 0,
      dodge: 0,
      spotHidden: 0,
      stealth: 0,
      intimidate: 0,
    };

    // If editing, use existing skills
    if (character?.skills) {
      return { ...defaultSkills, ...character.skills };
    }
    return defaultSkills;
  });

  // Calculate remaining points based on used points
  const [remainingPoints, setRemainingPoints] = useState(() => {
    if (character?.skills) {
      const usedPoints = Object.values(character.skills).reduce(
        (sum, val) => sum + val,
        0
      );
      return skillPoints - usedPoints;
    }
    return skillPoints;
  });

  const handleSkillChange = (skillName, newValue) => {
    // Ensure newValue is a number and cap it at 90
    const numValue = Math.min(parseInt(newValue) || 0, 90);

    // Calculate total points used with the new value
    const pointsUsed = Object.entries(skills).reduce(
      (total, [key, value]) => total + (key === skillName ? numValue : value),
      0
    );

    // Only update if we haven't exceeded our total points
    if (pointsUsed <= skillPoints) {
      setSkills({
        ...skills,
        [skillName]: numValue,
      });
      setRemainingPoints(skillPoints - pointsUsed);
    }
  };

  const handleNext = async () => {
    if (isEditing) {
      alert("Skills cannot be modified after character creation");
    }

    // Validate skills only if creating new character
    if (!isEditing && remainingPoints > 0) {
      alert("Please allocate all skill points");
      return;
    }

    try {
      const updatedCharacter = await post("/api/new-character", {
        skills: skills,
      });

      // Navigate back to character details if editing, otherwise to story
      if (isEditing) {
        navigate("/character-details", {
          state: { characterId: updatedCharacter._id },
        });
      } else {
        navigate("/story");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  return (
    <div className="v17_8">
      <MenuBar />
      <span className="v21_93">Skills</span>
      <span className="v24_90">Remaining Points: {remainingPoints}</span>

      <div className="skills-container">
        {/* First Row */}
        <div className="skills-row">
          {Object.entries(skills)
            .slice(0, 5)
            .map(([skillName, value]) => (
              <div key={skillName} className="skill-item">
                <span className="skill-name">
                  {skillName.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <input
                  type="number"
                  value={value || ""} // Show empty string instead of 0
                  min={0}
                  max={99}
                  onChange={(e) =>
                    handleSkillChange(skillName, parseInt(e.target.value))
                  }
                />
              </div>
            ))}
        </div>

        {/* Second Row */}
        <div className="skills-row">
          {Object.entries(skills)
            .slice(5)
            .map(([skillName, value]) => (
              <div key={skillName} className="skill-item">
                <span className="skill-name">
                  {skillName.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <input
                  type="number"
                  value={value || ""} // Show empty string instead of 0
                  min={0}
                  max={99}
                  onChange={(e) =>
                    handleSkillChange(skillName, parseInt(e.target.value))
                  }
                />
              </div>
            ))}
        </div>
      </div>

      <span className="next-button" onClick={handleNext} type="button">
        Next
      </span>
    </div>
  );
}

export default NewCharSkills;

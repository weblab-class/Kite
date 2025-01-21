import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newCharSkills.css";
import MenuBar from "../components/MenuBar";
import { get, post } from "../utilities.js";

function NewCharSkills() {
  const navigate = useNavigate();
  const [skillPoints, setSkillPoints] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [skills, setSkills] = useState({
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
  });

  useEffect(() => {
    // Fetch the in-progress character data from the backend
    const fetchCharacterData = async () => {
      try {
        const character = await get("/api/new-character");

        if (character && character.stats) {
          const totalPoints = character.stats.education * 4;
          setSkillPoints(totalPoints);
          setRemainingPoints(totalPoints);
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, []);

  const handleSkillChange = (skillName, newValue) => {
    // Calculate total points used with the new value
    const pointsUsed = Object.entries(skills).reduce(
      (total, [key, value]) => total + (key === skillName ? newValue : value),
      0
    );

    // Only update if we haven't exceeded our total points
    if (pointsUsed <= skillPoints) {
      setSkills({
        ...skills,
        [skillName]: newValue,
      });
      setRemainingPoints(skillPoints - pointsUsed);
    }
  };

  const handleNext = async () => {
    try {
      // Update the character with skills
      post("/api/new-character", { skills: skills });
      navigate("/story");
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
                  value={value}
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
                  value={value}
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

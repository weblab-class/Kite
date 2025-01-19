import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newCharSkills.css";

function NewCharSkills() {
  const navigate = useNavigate();
  const [skillPoints, setSkillPoints] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [skills, setSkills] = useState([
    { id: "libraryUse", name: "Library Use", value: 0, baseValue: 0 },
    { id: "listen", name: "Listen", value: 0, baseValue: 0 },
    { id: "firstAid", name: "First Aid", value: 0, baseValue: 0 },
    { id: "medicine", name: "Medicine", value: 0, baseValue: 0 },
    { id: "fighting", name: "Fighting", value: 0, baseValue: 0 },
    { id: "psychology", name: "Psychology", value: 0, baseValue: 0 },
    { id: "dodge", name: "Dodge", value: 0, baseValue: 0 },
    { id: "spotHidden", name: "Spot Hidden", value: 0, baseValue: 0 },
    { id: "stealth", name: "Stealth", value: 0, baseValue: 0 },
    { id: "intimidate", name: "Intimidate", value: 0, baseValue: 0 },
  ]);

  useEffect(() => {
    // Fetch the latest character data from the backend
    const fetchCharacterData = async () => {
      try {
        const response = await fetch("/api/characters");
        const characters = await response.json();
        const latestCharacter = characters[characters.length - 1];

        if (latestCharacter && latestCharacter.stats) {
          const totalPoints = latestCharacter.stats.education * 4;
          setSkillPoints(totalPoints);
          setRemainingPoints(totalPoints);
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, []);

  const handleSkillChange = (skillId, newValue) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === skillId) {
        // Ensure the new value isn't less than the base value
        const validatedValue = Math.max(skill.baseValue, newValue);
        return { ...skill, value: validatedValue };
      }
      return skill;
    });

    // Calculate total points used
    const pointsUsed = updatedSkills.reduce(
      (total, skill) => total + (skill.value - skill.baseValue),
      0
    );

    // Only update if we haven't exceeded our total points
    if (pointsUsed <= skillPoints) {
      setSkills(updatedSkills);
      setRemainingPoints(skillPoints - pointsUsed);
    }
  };

  const handleNext = async () => {
    try {
      // Get the latest character
      const response = await fetch("/api/characters");
      const characters = await response.json();
      const latestCharacter = characters[characters.length - 1];

      // Update the character with skills
      const updateResponse = await fetch("/api/new-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_info: {
            ...latestCharacter,
            skills: skills,
          },
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to save skills");
      }

      navigate("/story");
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  return (
    <div className="v17_8">
      <span className="v21_93">Skills</span>
      <span className="v24_90">Remaining Points: {remainingPoints}</span>

      <div className="skills-container">
        {/* First Row */}
        <div className="skills-row">
          {skills.slice(0, 5).map((skill) => (
            <div key={skill.id} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <input
                type="number"
                value={skill.value}
                min={skill.baseValue}
                max={99}
                onChange={(e) =>
                  handleSkillChange(skill.id, parseInt(e.target.value))
                }
              />
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="skills-row">
          {skills.slice(5).map((skill) => (
            <div key={skill.id} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <input
                type="number"
                value={skill.value}
                min={skill.baseValue}
                max={99}
                onChange={(e) =>
                  handleSkillChange(skill.id, parseInt(e.target.value))
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

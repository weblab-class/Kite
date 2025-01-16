import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCharSkills() {
  const navigate = useNavigate();
  const [total] = useState(400);

  const skills = [
    { id: "libraryUse", name: "Library Use", value: 20 },
    { id: "listen", name: "Listen", value: 20 },
    { id: "firstAid", name: "First Aid", value: 30 },
    { id: "medicine", name: "Medicine", value: 5 },
    { id: "fighting", name: "Fighting", value: 25 },
    { id: "psychology", name: "Psychology", value: 10 },
    { id: "dodge", name: "Dodge", value: 20 },
    { id: "spotHidden", name: "Spot Hidden", value: 25 },
    { id: "stealth", name: "Stealth", value: 20 },
    { id: "intimidate", name: "Intimidate", value: 15 },
  ];

  const handleNext = () => {
    navigate("/story");
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Skills</h1>
        <div className="character-form">
          <p className="rules-text">Total: {total}</p>
          <div className="skill-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="stat-container">
                <span className="rules-text">{skill.name}</span>
                <span className="rules-text">{skill.value}</span>
              </div>
            ))}
          </div>
          <button className="character-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCharSkills;

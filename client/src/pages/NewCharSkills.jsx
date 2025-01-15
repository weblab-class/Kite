import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newCharSkills.css";

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
    navigate("/story"); // Replace with your next route
  };

  return (
    <div className="v17_8">
      <span className="v21_93">Skills</span>
      <span className="v24_90">Total: {total}</span>

      <div className="skills-container">
        {/* First Row */}
        <div className="skills-row">
          <span className="v21_75">{skills[0].name}</span>
          <span className="v21_76">{skills[1].name}</span>
          <span className="v21_87">{skills[2].name}</span>
          <span className="v21_79">{skills[3].name}</span>
          <span className="v21_81">{skills[4].name}</span>
        </div>

        {/* Second Row */}
        <div className="skills-row">
          <span className="v21_83">{skills[5].name}</span>
          <span className="v21_85">{skills[6].name}</span>
          <span className="v21_91">{skills[7].name}</span>
          <span className="v21_89">{skills[8].name}</span>
          <span className="v21_77">{skills[9].name}</span>
        </div>
      </div>

      <button className="next-button" onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
}

export default NewCharSkills;

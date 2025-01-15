import React from "react";
import { useNavigate } from "react-router-dom";
import "./newCharPlayerInfo.css";

function NewCharPlayerInfo() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/new-character-stats"); // Replace with your next route
  };

  return (
    <div className="v16_6">
      <div className="v22_39">
        <span className="v22_10">Character Name:</span>
        <span className="v22_14">Age: </span>
        <span className="v22_11">Job:</span>
        <span className="v22_15">Gender:</span>
        <span className="v22_12">Medium</span>
        <span className="v22_13">Detective</span>
        <span className="v22_8">Player Name:</span>
        <span className="v95_57">Test</span>
        <span className="v95_59">Name</span>
        <span className="v95_60">100</span>
        <span className="v95_61">Helicopter</span>
      </div>
      <span className="v24_86" onClick={handleNext} role="button" tabIndex={0}>
        Next
      </span>
    </div>
  );
}

export default NewCharPlayerInfo;

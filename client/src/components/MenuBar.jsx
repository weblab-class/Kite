import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css";
import axios from "axios"; // Import axios for making API requests

function MenuBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    switch (path) {
      // case "save":
      //   console.log("Save game");
      //   saveMessageHistory();
      //   break;
      // case "load":
      //   console.log("Load game");
      //   break;
      case "rules":
        navigate("/rules");
        break;
      case "chars":
        navigate("/characters");
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  const saveMessageHistory = async () => {
    try {
      const messageHistory = []; // Replace with actual message history
      const response = await axios.post("/api/save-message-history", {
        messageHistory,
      });
      console.log("Message history saved:", response.data);
    } catch (error) {
      console.error("Error saving message history:", error);
    }
  };

  return (
    <>
      <div className="menu-area">
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>
      <div className={`menu-sidebar ${isMenuOpen ? "open" : ""}`}>
        {/* <span className="menu-item" onClick={() => handleNavigation("save")}>
          {`> Save`}
        </span>
        <span className="menu-item" onClick={() => handleNavigation("load")}>
          {`> Load`}
        </span> */}
        <span className="menu-item" onClick={() => handleNavigation("rules")}>
          {`> Rules`}
        </span>
        <span className="menu-item" onClick={() => handleNavigation("chars")}>
          {`> Chars`}
        </span>
      </div>
    </>
  );
}

export default MenuBar;

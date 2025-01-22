import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import "./Story.css";

function Story() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    switch (path) {
      case "save":
        // Add save functionality
        console.log("Save game");
        break;
      case "load":
        // Add load functionality
        console.log("Load game");
        break;
      case "rules":
        navigate("/rules");
        break;
      case "chars":
        navigate("/characters");
        break;
      default:
        break;
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <div className="v74_28">
      <div className="menu-area">
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>
      <div className={`v73_55 ${isMenuOpen ? "open" : ""}`}>
        <span
          className="v73_51"
          onClick={() => handleNavigation("save")}
          role="button"
          tabIndex={0}
        >
          {`> Save`}
        </span>
        <span
          className="v73_51"
          onClick={() => handleNavigation("load")}
          role="button"
          tabIndex={0}
        >
          {`> Load`}
        </span>
        <span
          className="v73_51"
          onClick={() => handleNavigation("rules")}
          role="button"
          tabIndex={0}
        >
          {`> Rules`}
        </span>
        <span
          className="v73_51"
          onClick={() => handleNavigation("chars")}
          role="button"
          tabIndex={0}
        >
          {`> Chars`}
        </span>
      </div>
      <div className="v74_50">
        <Chat />
      </div>
    </div>
  );
}

export default Story;

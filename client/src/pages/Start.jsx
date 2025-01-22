import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./start.css";
import { post } from "../utilities";

function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get("id_token");
    console.log("ID token:", idToken);
    if (idToken) {
      console.log("Got ID token, sending to server...");
      // Send token to your server
      post("/api/login", { token: idToken })
        .then((user) => {
          console.log("Login successful:", user);
          navigate("/start");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          navigate("/");
        });
    } else {
      console.log("No ID token found in URL:", window.location.href);
      navigate("/");
    }
  }, [navigate]);

  const handleRulesClick = () => {
    navigate("/rules"); // You'll need to create this route
  };

  const handleCharactersClick = () => {
    navigate("/characters"); // You'll need to create this route
  };

  return (
    <div className="v14_44">
      <div className="v14_45" />
      <span
        className="v14_47"
        onClick={handleCharactersClick}
        role="button"
        tabIndex={0}
      >
        Characters
      </span>
      <span
        className="v14_46"
        onClick={handleRulesClick}
        role="button"
        tabIndex={0}
      >
        Rules
      </span>
    </div>
  );
}

export default Start;

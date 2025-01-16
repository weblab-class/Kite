import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/start");
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Smog</h1>
        <div className="login-form">
          <button className="character-button" onClick={handleStartClick}>
            sign in with Google
          </button>
          <p className="rules-text">Made with ❤️ by Susan and Alice</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
